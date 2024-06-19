import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import Swal from 'sweetalert2'



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  
   lightStyle = {};
   registrationForm: FormGroup;

   constructor(private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  hasErrors(controlName: string, errorType: string){
    return this.registrationForm.get(controlName)?.hasError(errorType) && this.registrationForm.get(controlName)?.touched;
  }

   ngOnInit(): void {
    this.typeWriter();
    this.onScroll();
  }

  public sendEmail(e: Event) {
    e.preventDefault();

    if(this.registrationForm.valid){
      emailjs.sendForm('service_bhhc88i', 'template_mprm3k4', e.target as HTMLFormElement, '240msCoj8AucDMGVM')
      .then(
        () => {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 5000,
            timerProgressBar: true,
           
          });
          Toast.fire({
            icon: "success",
            title: "Message sent succesfully!"
          });
        },
        (error) => {
          console.log('FAILED...', (error as EmailJSResponseStatus).text);
        },
      );
  }else{
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: true,
     
    });
    Toast.fire({
      icon: "error",
      title: "Please enter the fields correctly!"
    });
  }
}

   onMouseMove(event: MouseEvent) {
     const x = event.clientX;
     const y = event.clientY;

    this.lightStyle = {
      left: `${x}px`,
      top: `${y}px`
    };
   }

  currentSection: string = 'about';

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {

    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');

    let currentSectionId = 'about';

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
        currentSectionId = section.id;
      }
    });

    navLinks.forEach((link) => {
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  scrollToSection(section: string): void {
     document.getElementById(section)?.scrollIntoView({ behavior: 'smooth', block: "center" });
     this.currentSection = section;
  }

  

  text = ''; // Texto que se mostrará con el efecto de máquina de escribir
  originalText = 'Sebastian Patitucci';
  index = 0;
  speed = 100; // Velocidad en milisegundos entre cada letra

  

  typeWriter(): void {
    if (this.index < this.originalText.length) {
      this.text += this.originalText.charAt(this.index);
      this.index++;
      setTimeout(() => {
        this.typeWriter();
      }, this.speed);
    }
  }
  
 

}
