import { Component, OnInit } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';  // Importa BarcodeScanner
import { Plugins, } from '@capacitor/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import * as QRCode from 'qrcode';
const { TextToSpeech } = Plugins as any;

@Component({
  selector: 'app-registrado',
  templateUrl: './registrado.page.html',
  styleUrls: ['./registrado.page.scss'],
})
export class RegistradoPage implements OnInit {
  codigoQR: string = '';
  constructor() { }

  ngOnInit() {
  }
  async generarQR(enlace: string) {
    try {
      this.codigoQR = await QRCode.toDataURL(enlace);
      console.log('Código QR generado:', this.codigoQR);
    } catch (error) {
      console.error('Error al generar el código QR:', error);
    }
  }

  generarCodigoQR() {
    const enlaceParaQR = 'https://www.duoc.cl/'; 
    this.generarQR(enlaceParaQR);
  }

  async escanearQR() {
    if (Capacitor.isPluginAvailable('BarcodeScanner')) { 
      try {
        const result = await BarcodeScanner.startScan();
        if (result.hasContent) {
          window.open(result.content, '_blank');
        }                                              
      } catch (error) {
        console.error('Error al escanear:', error);
      }
    } else {
      console.warn('La funcionalidad de escaneo de QR solo está disponible en dispositivos nativos.');
    }
  }

}
