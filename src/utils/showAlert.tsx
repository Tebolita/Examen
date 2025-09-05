import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { SweetAlertIcon } from 'sweetalert2';


const MySwal = withReactContent(Swal)
function ShowAlert(message:string, icon: SweetAlertIcon){
  const Toast =  MySwal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

  Toast.fire({
    icon: icon,
    title: message
  });
}


export default ShowAlert