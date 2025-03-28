import { Component, OnInit } from '@angular/core';
import { CursosServiceService } from '../../../services/cursos-service';
import { Curso } from '../../../documentos/cursosDocumento';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cursos-alumnos',
  templateUrl: './cursos-alumnos.component.html',
  styleUrl: './cursos-alumnos.component.css'
})
export class CursosAlumnosComponent implements OnInit {
  usuario = {
    idUsuario: 1,
    nombre: 'Nombre del Alumno',
    apellidoPaterno: 'ApellidoPaterno',
    apellidoMaterno: 'ApellidoMaterno',
    email: 'ejemplo@gmail.com',
    contrasenia: 'password123',
    nombreUsuario: 'nombreUsuario',
    cursosCompletados: 5
  };

  cursos: Curso[] = [];
  cursosFiltrados: Curso[] = [];
  nombreCurso: string = '';
  categoriaSeleccionada: string = '';
  menuOpen = false;

  constructor(private cursosService: CursosServiceService, private router: Router) {}

  ngOnInit(): void {
    this.obtenerCursos();
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  obtenerCursos() {
    this.cursosService.getCursos().subscribe(
      (data) => {
        console.log('Cursos obtenidos:', data);
        this.cursos = data;
        this.cursosFiltrados = data;
      },
      (error) => {
        console.error('Error al obtener cursos:', error);
        if (error.status === 500) {
          console.log('Mensaje de error del servidor:', error.message);
          console.log('Detalles del error:', error.error);
        }
      }
    );
  }

  filtrarCursos(): void {
    let cursosFiltrados = this.cursos;

    if (this.nombreCurso) {
      cursosFiltrados = cursosFiltrados.filter(curso =>
        curso.tituloCurso.toLowerCase().includes(this.nombreCurso.toLowerCase())
      );
    }

    if (this.categoriaSeleccionada) {
      cursosFiltrados = cursosFiltrados.filter(curso =>
        curso.nombreCategoria.toLowerCase() === this.categoriaSeleccionada.toLowerCase()
      );
    }

    this.cursosFiltrados = cursosFiltrados;
  }

  onNombreCursoChange(event: any): void {
    this.nombreCurso = event.target.value;
    this.filtrarCursos();
  }

  onCategoriaChange(event: any): void {
    this.categoriaSeleccionada = event.target.value;

    if (this.categoriaSeleccionada) {
      this.cursosService.filtrarCursoPorCategoria(this.categoriaSeleccionada).subscribe(
        (data) => {
          this.cursosFiltrados = data;
        },
        (error) => {
          console.error('Error al filtrar cursos por categoría', error);
          this.cursosFiltrados = [];
        }
      );
    } else {
      this.cursosFiltrados = this.cursos;
    }
  }

  accederCurso(curso: any) {
    console.log('Accediendo al curso:', curso);
  }

  redirigirDetalleCurso(curso: any) {
    this.router.navigate(['/descripcion-curso-alumno', curso.tituloCurso]);
  }

  logout() {
    console.log('Cerrando sesión...');
    this.router.navigate(['/login']);
  }
}


