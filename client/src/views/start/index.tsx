import { useNavigate, Link } from "react-router-dom";


const Start = () => {
    const navigate = useNavigate();
    const projects: Array<Project> | [] = JSON.parse(localStorage.getItem('projects') as string) || [];
    const currentProject: Project = JSON.parse(localStorage.getItem('currentProject') as string) || {};
    document.title = 'Start - Project Manager';
    const setCurrentProject = (project: Project) => {
        localStorage.setItem('currentProject', JSON.stringify(project));
        navigate('/editor');
    }
    return (
        <>
            <div class=" p-3 h-screen w-screen">
                <div class="flex justify-between items-center">
                    <div class="flex items-center relative">
                        <i class="bi bi-search absolute left-[1rem] text-base"></i>
                        <input
                            id="query"
                            class="w-full h-[45px] pl-[2.5rem] rounded-md outline-none text-[#bdbecb] bg-[#313131] border-solid border-[0.1rem] border-white"
                            type="search"
                            placeholder="Search..."
                            name="searchBar"
                        />
                    </div>

                    <div class="flex justify-evenly w-[300px]">
                        <Link  target="_blank" to="/new-project"  class="border-white border-solid border-[1px] p-3 flex justify-center items-center rounded-md w-[74px] h-[74px]">
                            <i class="bi bi-folder-plus text-3xl"></i>
                        </Link>
                        <button class="border-white border-solid border-[1px] p-3 rounded-md w-[74px] h-[74px]" onClick={() => {
                            window.JStudio.init({ create: false })
                                .then((project) => {
                                    const uniqueProjects = [...new Set([...projects, project])];
                                    localStorage.setItem('projects', JSON.stringify(uniqueProjects));
                                    setCurrentProject(project);
                                });
                        }}>
                            <i class="bi bi-folder text-3xl"></i>
                        </button>
                    </div>
                </div>
                <div>
                    <div>
                        <h1>Recent Projects</h1>
                        <button class="flex flex-col items-center justify-between p-2 border-white border-solid border-[1px] rounded-md"
                            onClick={() => {
                               navigate('/editor');
                            }}
                        >
                            <i class="bi bi-folder text-3xl"></i>
                            <p>{currentProject.name}</p>
                            <p class="text-xs">
                                {currentProject.path}
                            </p>
                        </button>
                    </div>
                    <div >
                        <h1>All Projects</h1>
                        {projects.map((project, index) => {
                            return (
                                <button key={index} class="flex flex-col items-center justify-between p-2 border-white border-solid border-[1px] rounded-md"
                                    onClick={() => {
                                        setCurrentProject(project);
                                    }}
                                >
                                    <i class="bi bi-folder text-3xl"></i>
                                    <p>{project.name}</p>
                                    <p class="text-xs">
                                        {project.path}
                                    </p>
                                </button>
                            )
                        })}
                    </div>
                </div>

            </div>

        </>
    )
}

export default Start