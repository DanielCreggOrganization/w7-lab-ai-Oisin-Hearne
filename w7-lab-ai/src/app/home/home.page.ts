import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, 
         IonGrid, IonRow, IonCol, IonCard, IonCardContent, 
         IonCardHeader, IonCardTitle, IonItem, IonLabel, 
         IonButton, IonIcon, IonProgressBar, IonText,
         IonRadioGroup, IonRadio, IonImg, IonTextarea,
         IonRippleEffect } from '@ionic/angular/standalone';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { environment } from '../../environments/environment';
import { GeminiAiService } from '../services/gemini-ai.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonItem,
    IonLabel,
    IonButton,
    IonIcon,
    IonProgressBar,
    IonText,
    IonRadioGroup,
    IonRadio,
    IonImg,
    IonTextarea,
    IonRippleEffect,
    CommonModule, 
    FormsModule,
  ]
})
export class HomePage {

  constructor(private geminiService: GeminiAiService) {}

  prompt = 'Please provide a recipe for the baked goods attached in the image, using the metric system and formatted in HTML.'; 
  output = '';
  isLoading = false;

  availableImages = [
    { url: 'assets/images/baked_goods_1.jpg', label: 'Criossants' },
    { url: 'assets/images/baked_goods_2.jpg', label: 'Cookies' },
    { url: 'assets/images/baked_goods_3.jpg', label: 'Muffins' }
  ];

  selectedImage = this.availableImages[0].url;

  get formattedOutput() {
    return this.output.replace(/\n/g, '<br>');
  }

  selectImage(url: string) {
    this.selectedImage = url;
  }

  async onSubmit() {
    if (this.isLoading) return;
    this.isLoading = true;
    
    const base64image = await this.geminiService.getImageAsBase64(this.selectedImage);
    this.output = await this.geminiService.generateRecipe(base64image, this.prompt);
    
    this.isLoading = false;
  }
}