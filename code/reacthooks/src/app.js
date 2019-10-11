import {message} from 'antd'
import {dev} from '../config/dev'

message.config({
  maxCount: 1,
})

if (!dev) {
  window.console.log=() => {}
}
// export const dva = {
//   config: {
//     onError(err) {
//       err.preventDefault();
//       console.error(err.message);
//     },
//   },
// };
// export function patchRoutes(routes) {
//   // routes.unshift(...home)
//   // console.log(routes)
// }
//
// export function render(oldRender) {
//   oldRender()
//   // console.log(a)
//   // setTimeout(oldRender, 1000);
// }
//
// export function onRouteChange({ location, routes}) {
//   console.log(location, routes);
// }
