import { type UserModule } from "~/types/types"
import { load_script } from '@/helpers/vue.loadscript'


export const install: UserModule = async ({ }) => {
	await load_script("/assets/js/jquery-1.11.0.min.js")
	await load_script("/assets/js/jquery-ui/js/jquery-ui-1.10.3.minimal.min.js")
	await load_script("/assets/js/gsap/main-gsap.js")
	await load_script("/assets/js/bootstrap.js")
	await load_script("/assets/js/joinable.js")
	await load_script("/assets/js/resizeable.js")
	await load_script("/assets/js/neon-api.js")
	await load_script("/assets/js/neon-custom.js")
}