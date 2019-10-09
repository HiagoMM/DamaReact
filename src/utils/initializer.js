import Swal from 'sweetalert2';

export default {
  async starter() {
    return Swal.fire({
      title: 'Digite seu usuario do github',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: false,
      confirmButtonText: 'ok',
      showLoaderOnConfirm: true,
      preConfirm: login => {
        return fetch(`//api.github.com/users/${login}`)
          .then(response => {
            if (!response.ok) {
              throw new Error(response.statusText);
            }
            return response.json();
          })
          .catch(error => {
            Swal.showValidationMessage(`Request failed: ${error}`);
          });
      },
      allowOutsideClick: () => !Swal.isLoading()
    });
  }
};
