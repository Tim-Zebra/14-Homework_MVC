// const postId = document.querySelector('input[name="post-id"]').value;

const editFormHandler = async function(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value;
  const body = document.querySelector('textarea[name="post-body"]').value;

  // Functions only if a title and body are entered
if(title && body) {

  const response = await fetch('/api/post/1', {
      method: 'PUT',
      body: JSON.stringify({ title, body }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
console.log('This happened', response);
    if (response.ok) {
      console.log('Success!: Replaced by, ', title, ' and ', body)
      document.location.replace('/dashboard');
    } else {
      alert('Failed to update!');
    } 
  }
};

const deleteClickHandler = async (event) => {
  await fetch(`/api/post/:id`, {
    method: 'DELETE'
  });

  document.location.replace('/dashboard');
};

document
  .querySelector('#edit-post-form')
  .addEventListener('submit', editFormHandler);
// document
//   .querySelector('#delete-btn')
//   .addEventListener('click', deleteClickHandler);
