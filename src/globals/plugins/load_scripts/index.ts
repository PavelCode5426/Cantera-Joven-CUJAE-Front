import { type UserModule } from "~/types/types"
import { load_script } from '@/helpers/vue.loadscript'


export const install: UserModule = ({ }) => {
  // load_script('/assets/js/core/popper.min.js')
  // load_script('/assets/js/core/bootstrap.min.js')
  // load_script('/assets/js/plugins/perfect-scrollbar.min.js')
  // load_script('/assets/js/plugins/smooth-scrollbar.min.js')

  // const script = document.createElement('script')
  // script.innerHTML = `var win = navigator.platform.indexOf('Win') > -1;
  //       if (win && document.querySelector('#sidenav-scrollbar')) {
  //         var options = {
  //           damping: '0.5'
  //         }
  //         Scrollbar.init(document.querySelector('#sidenav-scrollbar'), options);
  //       }`

  // load_script('/assets/js/material-dashboard.min.js')
}