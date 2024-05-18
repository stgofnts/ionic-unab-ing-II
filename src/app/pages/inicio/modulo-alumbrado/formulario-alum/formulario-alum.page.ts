import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { ReportAlumbrado } from "src/app/models/report.model";
import { MapService } from "src/app/services/map.service";
import { CameraService } from "src/app/services/camera.service";
import { ReportService } from "src/app/services/report.service";
import { ToastController } from "@ionic/angular";

@Component({
  selector: "app-formulario-alum",
  templateUrl: "./formulario-alum.page.html",
  styleUrls: ["./formulario-alum.page.scss"],
})
export class FormularioAlumPage implements OnInit {
  formAlumbrado: ReportAlumbrado = {
    module: "alumbrado",
    coordinate: [0, 0],
    photo: "", // Link de la foto
    date: null,
    typeIncident: "",
    description: "",
  };

  constructor(
    private cameraService: CameraService,
    private toastController: ToastController,
    private reportService: ReportService,
    private navController: NavController
  ) {
    this.reportService.formData = this.formAlumbrado;
  }

  async ngOnInit() {}

  async takePhoto() {
    // Verificamos si se ha seleccionado una opción antes de permitir tomar la foto, para esto debe estar el titulo seleccionado
    if (!this.formAlumbrado.typeIncident) {
      const toast = await this.toastController.create({
        message:
          "Por favor, selecciona un título antes de seleccionar la foto.",
        duration: 2000, //Duracion de la notificacion en milisegundos
        position: "bottom", //Posicion de la notificacion
      });
      toast.present();
      console.error(
        "Por favor, seleccione una opción antes de tomar una foto."
      );
      return; // Salimos de la función si no hay una opción seleccionada
    }
    //Llamamos al metodo takePhoto() del servicio de la camara para tomar una foto
    const photo = await this.cameraService.takePhoto();
    //Verificamos si la foto obtenida es valida (no es nula)
    if (photo) {
      //Si la foto es valida, la asignamos a la variable 'photo' del componente
      this.formAlumbrado.photo = photo;
    } else {
      //Si la foto es nula, mostramos un mensaje de error en la consola
      console.error("La foto es nula o no valida.");
    }
  }

  public goToLocationPage() {
    this.navController.navigateForward("/inicio/location");
  }

  // Enviar formulario
  public validateForm(): void {
    let isValid = true;
    // TODO Validaciones exclusivas de este modulo

    this.reportService.validateForm(isValid); // Enviar formulario a servicio
  }
}
