import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


//Components

import { UsuariosAdminComponent } from './components/administrador/usuarios-admin/usuarios-admin.component';
import { LoginComponent} from './components/login/login/login.component';
import { RegistroComponent } from './components/login/registro/registro.component';
import { CursosAlumnosComponent } from './components/alumnos/cursos-alumnos/cursos-alumnos.component';
import { ContenidoCursoComponent } from './components/alumnos/contenido-curso/contenido-curso.component';
import { DescripcionCursoAlumnoComponent } from './components/alumnos/descripcion-curso-alumno/descripcion-curso-alumno.component';
import { CursosAdminComponent } from './components/administrador/cursos-admin/cursos-admin.component';
import { PerfilAlumnoComponent } from './components/alumnos/perfil-alumno/perfil-alumno.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { CursosInstructorComponent } from './components/instructores/cursos-instructor/cursos-instructor.component';
import { CrearCursoComponent } from './components/instructores/crear-curso/crear-curso.component';
import { SolicitudesAdminComponent } from './components/administrador/solicitudes-admin/solicitudes-admin.component';
import { QuienesSomosComponent } from './components/inicio/quienes-somos/quienes-somos.component';
import { ContactoComponent } from './components/inicio/contacto/contacto.component';


export const routes: Routes = [
<<<<<<< HEAD

  { path: '', redirectTo: 'usuarios-admin', pathMatch: 'full' },
=======
  { path: '', redirectTo: 'home/inicio', pathMatch: 'full' }, 
>>>>>>> f58ff088e0ee4e8a0449b22e502b663e023e2379


  { path: 'home/inicio', component: InicioComponent }, 
  { path: 'home/quienesSomos', component: QuienesSomosComponent},
  { path: 'home/contacto', component: ContactoComponent },
  { path: 'home/login', component: LoginComponent }, 
  { path: 'home/registro', component: RegistroComponent }, 


  // Rutas para el administrador
 {
    path: 'administrador',
    children: [
      {
        path: 'usuarios',
        children: [
          { path: 'ver', component: UsuariosAdminComponent }
        ]
      },
      {
        path: 'cursos',
        children: [
          { path: 'ver', component: CursosAdminComponent }
        ]
      },
      {
        path: 'solicitudes',
        children: [
          { path: 'ver', component: SolicitudesAdminComponent }
        ]
      }
    ]
  },

  {
    path: 'alumnos',
    children: [
      { path: 'cursos', component: CursosAlumnosComponent },
      { path: 'contenido', component: ContenidoCursoComponent },
      { path: 'descripcion/:id', component: DescripcionCursoAlumnoComponent },
      { path: 'perfil', component: PerfilAlumnoComponent },
      { path: '', redirectTo: 'cursos', pathMatch: 'full' },
      { path: '**', redirectTo: 'cursos' }
    ]
  },
  { path: '', redirectTo: 'alumnos/cursos', pathMatch: 'full' },
  { path: '**', redirectTo: 'alumnos/cursos' },


  // Rutas para los alumnos
  { path: 'cursos-alumnos', component: CursosAlumnosComponent },
  { path: 'contenido-curso', component: ContenidoCursoComponent },
  { path: 'descripcion-curso-alumno', component: DescripcionCursoAlumnoComponent },
  { path: 'perfil-alumno', component: PerfilAlumnoComponent },

    //Rutas para el instructor
    {path: 'cursos-instructor', component: CursosInstructorComponent},
    {path: 'crear-curso', component:CrearCursoComponent},


<<<<<<< HEAD
  // Redirección por defecto
  { path: '**', redirectTo: 'administrador/usuarios/ver' }
=======
  // Redirección por defecto (en caso de ruta no encontrada)
  { path: '**', redirectTo: 'home/inicio' },
>>>>>>> f58ff088e0ee4e8a0449b22e502b663e023e2379

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }