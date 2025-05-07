import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  userMessage: string = '';
  messages: { content: string; time: string }[] = [];
  isWaiting: boolean = false; 

  sendMessage() {
    if (this.userMessage.trim()) {
      const newMessage = { content: this.userMessage, time: new Date().toLocaleTimeString() };
      this.messages.push(newMessage);
      this.isWaiting = true;  
      this.respondToMessage(this.userMessage);
      this.userMessage = '';
    }
  }

  respondToMessage(userMessage: string) {
    setTimeout(() => {
      let response: string;

      const guitarraKeywords = ['guitarra', 'guitara', 'guitar', '6 cuerdas', '7 cuerdas', 'headless'];
      const greetingKeywords = ['hola', 'buenos dias','buenos días', 'que tal','qué tal', 'buenas tardes', 'buenas noches'];
      const thankYouKeywords = ['gracias', 'muchas gracias', 'te lo agradezco', 'gracias por tu ayuda'];
      const accessoryKeywords = ['accesorio', 'accesorios', 'accessory'];
      const puaKeywords = ['pua', 'púa', 'púas', 'puas'];
      const cuerdasKeywords = ['cuerdas'];
      const fundaKeywords = ['funda'];
      const modelKeywords = ['les paul', 'sg', 'stratocaster', 'telecaster'];
      const goodbyeKeywords = ['adios', 'hasta pronto', 'hasta la vista', 'nos vemos', 'chau', 'chao', 'hasta', 'bye', 'adiós',];

       
      if (goodbyeKeywords.some(goodbye => userMessage.toLowerCase().includes(goodbye))) {
        response = '¡Hasta pronto! Que tengas un excelente día. 😊';
      }
       
      else if (greetingKeywords.some(greeting => userMessage.toLowerCase().includes(greeting))) {
        response = '¡Hola! ¿En qué puedo ayudarte hoy?';
      }
      
      else if (thankYouKeywords.some(thankYou => userMessage.toLowerCase().includes(thankYou))) {
        response = '¡De nada! Que tengas un excelente día. 😊';
      }
       
      else if (guitarraKeywords.some(keyword => userMessage.toLowerCase().includes(keyword))) {
        response = 'Te recomiendo la Blanco Valencia BG, la encontrarás la primera en el listado.';
      } 
       
      else if (accessoryKeywords.some(keyword => userMessage.toLowerCase().includes(keyword))) {
        response = 'Te recomendamos las cuerdas Ernie Ball 2221 y la púa Manny Lebowski que podrás encontrar en nuestra sección de accesorios';
      } 
       
      else if (puaKeywords.some(keyword => userMessage.toLowerCase().includes(keyword))) {
        response = 'Te recomendamos que pruebes nuestras 3 púas, las encontrarás en accesorios.';
      }
       
      else if (cuerdasKeywords.some(keyword => userMessage.toLowerCase().includes(keyword))) {
        response = 'Aquí tienes unas cuerdas de guitarra de alta calidad: Ernie Ball 2220 y Ernie Ball 2223. Encuentralas en nuestra sección de Accesorios.';
      }
       
      else if (fundaKeywords.some(keyword => userMessage.toLowerCase().includes(keyword))) {
        response = 'Disponemos de un sólo modelo universal, puedes encontrarla en nuestra sección de accesorios.';
      }
       
      else if (modelKeywords.some(keyword => userMessage.toLowerCase().includes(keyword))) {
        response = 'Lo siento, no tenemos ese modelo, pero te invitamos a que descubras nuestros modelos originales.';
      } else {
        response = 'Lo siento, no entiendo tu pregunta. ¿Puedes volver a preguntarme?';
      }

      
      const responseMessage = { content: response, time: new Date().toLocaleTimeString() };
      this.messages.push(responseMessage);
      
      this.isWaiting = false;

    }, 1000);   
  }
}
