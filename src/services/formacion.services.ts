import tutoriaServicesInstance ,{TutoriaServices} from "~/services/formacion/tutoria.services";

export class FormacionServices {
    public tutoriaService: TutoriaServices


    constructor(tutoriaService: TutoriaServices) {
        this.tutoriaService = tutoriaService;
    }
}

const formacionServicesInstance = new FormacionServices(
    tutoriaServicesInstance
)
export default formacionServicesInstance