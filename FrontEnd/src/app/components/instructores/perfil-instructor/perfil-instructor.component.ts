import { Component, OnInit } from '@angular/core';
import { InstructorService } from '../../../services/instructor.service';
import { UsuariosService } from '../../../services/usuarios-service.service';
import { InstructorDocumento } from '../../../documentos/usuarioDocumento';

@Component({
  selector: 'app-perfil-instructor',
  templateUrl: './perfil-instructor.component.html',
  styleUrls: ['./perfil-instructor.component.css']
})
export class PerfilInstructorComponent implements OnInit {
  instructor: any = {
    idUsuario: 12,
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    nombreUsuario: '',
    correo: '',
    telefono: '',
    direccion: '',
    cedula: ''
  };

  nuevaContrasenia: string = '';
  confirmarContrasenia: string = '';
  mensajeRespuesta: string = '';
  mensajeExito: boolean = true;

  constructor(
    private instructorService: InstructorService,
    private usuariosService: UsuariosService) { }

  ngOnInit(): void {
    this.cargarPerfilInstructor();
  }

  cargarPerfilInstructor(): void {
    this.usuariosService.obtenerUsuarioPorId(this.instructor.idUsuario).subscribe({
      next: (datos: InstructorDocumento) => {
        console.log('Usuario cargado', datos);
        
        this.instructor = {
          idUsuario: this.instructor.idUsuario, // Mantiene el ID actual
          nombre: datos.nombre,
          apellidoPaterno: datos.apellidoPaterno,
          apellidoMaterno: datos.apellidoMaterno,
          nombreUsuario: datos.nombreUsuario,
          correo: datos.correo, // Ajusta el nombre de la propiedad
          telefono: datos.telefono,
          direccion: datos.direccion,
          especialidad: this.instructor.especialidad // Si la API lo devuelve, usa `datos.especialidad`
        };
      },
      error: (error) => {
        this.mensajeRespuesta = 'Error al cargar el perfil: ' + error.message;
      }
    });
  }
  

  guardarCambios() {
    if (!this.instructor || !this.instructor.idUsuario) {
      console.error("El instructor o su ID no están definidos.");
      return;
    }
  
    console.log("Enviando datos:", this.instructor);
  
    this.instructorService.actualizarPerfilInstructor(
      this.instructor.idUsuario,
      this.instructor.nombre || '',
      this.instructor.apellidoPaterno || '',
      this.instructor.apellidoMaterno || '',
      this.instructor.correo || '',
      this.instructor.telefono || '',
      this.instructor.direccion || '',
      this.nuevaContrasenia || '', // Si no se está cambiando la contraseña, enviar una cadena vacía
      this.nuevaContrasenia ? true : false, // actualizar_contrasenia es true solo si se ingresa una nueva contraseña
      this.instructor.nombreUsuario || ''
    ).subscribe({
      next: (respuesta) => {
        console.log("Perfil actualizado:", respuesta);
        this.mensajeRespuesta = "Perfil actualizado con éxito.";
        this.mensajeExito = true;
      },
      error: (error) => {
        console.error("Error al actualizar perfil:", error);
        this.mensajeRespuesta = "Hubo un error al actualizar el perfil.";
        this.mensajeExito = false;
      }
    });
  }
  
}
