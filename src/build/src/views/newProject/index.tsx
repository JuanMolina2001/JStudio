
const NewProject = () => {
  document.title = 'New Project - Project Manager';
  return (
    <form action="" class="flex flex-col">
      <h1>
        Name
      </h1>
      <input type="text" name="name" id="name" />
      <h1>
        Platform
      </h1>
      <select name="platform" id="platform">
        <option value="html">Desktop</option>
        <option value="mobile">Mobile</option>
        <option value="web">Web</option>
      </select>
      <h1>
        Description
      </h1>
      <textarea name="description" id="description" rows={4}></textarea>
      <button type="submit">Create Project</button>
    </form>
  )
}

export default NewProject