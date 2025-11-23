import { Component, signal, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { jsPDF } from 'jspdf';
import { SeoService } from '../../services/seo.service';
import { ReservasService } from '../../services/reservas.service';

@Component({
  selector: 'app-my-services',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatSliderModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatCheckboxModule,
  ],
  templateUrl: './my-services.component.html',
  styleUrls: ['./my-services.component.css'],
})
export class MyServicesComponent implements OnInit {
  disableDates: Date[] = [];

  constructor(
    private seoService: SeoService,
    private reservasService: ReservasService
  ) {}

  ngOnInit(): void {
    this.seoService.setSeoData({
      pageTitle: 'Servicios Fotográficos Profesionales',
      description:
        'Paquetes para bodas, sesiones de embarazo, fotografía infantil y más. Consulta nuestros precios.',
      keywords:
        'precios fotografía, sesión de bodas, fotografía infantil Irapuato',
      // image: 'assets/images/services-og.jpg'
    });
    this.reservasService.getReservas().subscribe((reservas) => {
      this.disableDates = reservas.map((r) => r.fechaEvento.toDate());
    });
  }

  myDateFilter = (d: Date | null): boolean => {
    if (!d) return true;
    const time = d?.setHours(0, 0, 0, 0);
    return !this.disableDates.some(
      (date) => date.setHours(0, 0, 0, 0) === time
    );
  };

  readonly videoPricePerHour = 1500;

  // Paquetes de servicios
  paquetes = [
    {
      name: 'Basico',
      price: 4000,
      features: [
        'Sesion durante el evento',
        'Cobertura de Ceremonia Religiosa',
        'Cobertura de 2 horas de evento',
      ],
      videoFeatures: [
        'Cobertura de ceremonia religiosa',
        'Cobertura de 2 horas de evento',
      ],
      entrega: [
        '40 Fotografias digitales retocadas',
        '1 Memoria USB con pelicula de duracion de 20 a 30 minutos',
      ],
      extras: ['(Fotografias impresas tienen un costo adicional)'],
      popular: false,
    },
    {
      name: 'Estándar',
      price: 5500,
      features: [
        'Sesion durante el evento',
        'Cobertura de Ceremonia Religiosa',
        'Cobertura de 4 horas de evento',
      ],
      videoFeatures: [
        'Cobertura de ceremonia religiosa',
        'Cobertura de 4 horas de evento',
      ],
      entrega: [
        '100 Fotografias digitales retocadas',
        '1 Memoria USB (Fotografias y pelicula con duracion de 1 hora)',
      ],
      extras: ['(Fotografias impresas tienen un costo adicional)'],
      popular: true,
    },
    {
      name: 'Premium',
      price: 7500,
      features: [
        'Sesion previa al evento (casual o vestidos)',
        'Sesion durante el evento',
        'Cobertura de Ceremonia Religiosa',
        'Cobertura de 4 horas de evento',
        'Tomas aereas con dron',
      ],
      videoFeatures: [
        'Cobertura de ceremonia religiosa',
        'Cobertura de 4 horas de evento',
        'Tomas aereas con dron',
      ],
      entrega: [
        '50 Fotografias retocadas impresas',
        '100 Fotografias digitales retocadas',
        'Una ampliacion de 14x20"',
        'Una memoria USB (Fotografias y pelicula con duracion de 1 hora)',
      ],
      popular: false,
    },
    {
      name: 'Deluxe',
      price: 9000,
      features: [
        'Sesion previa al evento (casual o vestidos)',
        'Sesion durante el evento',
        'Cobertura de Ceremonia Religiosa',
        'Cobertura de 6 horas de evento',
        'Tomas aereas con dron',
      ],
      videoFeatures: [
        'Cobertura de ceremonia religiosa',
        'Cobertura de 6 horas de evento',
        'Tomas aereas con dron',
      ],
      entrega: [
        '70 Fotografias retocadas impresas',
        '140 Fotografias digitales retocadas',
        'Una ampliacion de 14x20"',
        'Una memoria USB (Fotografias y pelicula con duracion de 1 hora)',
      ],
      popular: false,
    },
  ];

  // Signals para estado reactivo
  duration = signal(1);
  photos = signal(10);
  videoHours = signal(1); //1 = 1 hora contratada
  includeDrone = signal(false);
  includeAlbum = signal(false);
  selectedDate = new FormControl<Date | null>(null);

  // Propiedades para el PDF
  whatsappNumber = '4622439905';
  bankAccounts = [
    {
      banco: 'BBVA',
      cuenta: '4152 3144 1130 8664',
      clabe: '',
      titular: 'Braulio Rodríguez',
    },
  ];

  // Métodos actualizados para respuesta en tiempo real
  updateDuration(event: any) {
    const value = event?.target?.value ?? event?.value ?? event;
    const validatedValue = Math.min(12, Math.max(1, Number(value) || 1));
    this.duration.set(validatedValue);
  }

  updatePhotos(event: any) {
    const value = event?.target?.value ?? event?.value ?? event;
    const validatedValue = Math.min(500, Math.max(1, Number(value) || 1));
    this.photos.set(validatedValue);
  }

  updateVideoHours(event: any) {
    const value = event?.target?.value ?? event?.value ?? event;
    const validatedValue = Math.min(12, Math.max(0, Number(value) || 0));
    this.videoHours.set(validatedValue);
  }

  updateDrone(event: any) {
    this.includeDrone.set(event.checked);
  }

  updateAlbum(event: any) {
    this.includeAlbum.set(event.checked);
  }

  // Método para formatear el número de fotos
  formatPhotos(quantity: number): string {
    return quantity === 500 ? '500+' : quantity.toString();
  }

  // Cálculo de precio
  calculatePrice(): number {
    const isHighSeason = this.isHighSeason;
    const basePrice = this.duration() * (isHighSeason ? 700 : 300);
    const photosPrice = this.photos() * (isHighSeason ? 50 : 30);
    const videoPrice = this.videoHours() * this.videoPricePerHour;
    const extras =
      (this.includeDrone() ? 1500 : 0) + (this.includeAlbum() ? 1600 : 0);
    return basePrice + photosPrice + extras + videoPrice;
  }

  // Formateador de precio
  formatPrice(price: number | undefined): string {
    if (price === undefined) {
      return 'Precio no disponible';
    }
    return `$${price.toLocaleString('es-MX')} MXN`;
  }

  // Getter para temporada alta
  get isHighSeason(): boolean {
    return this.selectedDate.value?.getMonth() === 11; // Diciembre
  }

  // Método para generar PDF de paquetes
  async selectPackage(index: number) {
    const selectedPackage = this.paquetes[index];
    const doc = new jsPDF();

    // Logo
    try {
      const logoUrl =
        'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/logotiposPortafolioFotografico/ae260gsv7klrwzv3skf5';
      const logoData = await this.getBase64Image(logoUrl);
      const logoWidth = 30;
      const logoHeight = 30;
      const pageWidth = doc.internal.pageSize.getWidth();
      doc.addImage(
        logoData,
        'PNG',
        pageWidth - logoWidth - 15,
        15,
        logoWidth,
        logoHeight
      );
    } catch (error) {
      console.warn('Error al cargar logo:', error);
    }

    // Contenido
    let yPosition = 25;

    //Titulo
    doc.setFontSize(18);
    doc.text(`Cotizacion de Servicios Fotográficos`, 15, yPosition);
    yPosition += 10;

    //Nombre del paquete
    doc.setFontSize(14);
    doc.text(`Paquete: ${selectedPackage.name}`, 15, yPosition);
    yPosition += 15;

    // Seccion (Incluye fotografia)
    doc.setFontSize(12);
    doc.setFont('bold');
    doc.text('Fotografía:', 15, yPosition);
    doc.setFont('undefined', 'normal');

    selectedPackage.features?.forEach((feature) => {
      yPosition += 7;
      doc.text(`• ${feature}`, 20, yPosition);
    });

    // Seccion video
    if (selectedPackage.videoFeatures?.length) {
      yPosition += 12;
      doc.setFontSize(12);
      doc.setFont('bold');
      doc.text('Video:', 15, yPosition);
      doc.setFont('undefined', 'normal');

      selectedPackage.videoFeatures.forEach((feature) => {
        yPosition += 7;
        doc.text(`• ${feature}`, 20, yPosition);
      });
    }

    // Seccion entrega
    if (selectedPackage.entrega?.length) {
      yPosition += 12;
      doc.setFontSize(12);
      doc.setFont('bold');
      doc.text('Entrega:', 15, yPosition);
      doc.setFont('undefined', 'normal');

      selectedPackage.entrega.forEach((feature) => {
        yPosition += 7;
        doc.text(`• ${feature}`, 20, yPosition);
      });
    }

    // Seccion extras
    if (selectedPackage.extras?.length) {
      yPosition += 12;
      doc.setFontSize(12);
      doc.setFont('bold');
      doc.text('Extras:', 15, yPosition);
      doc.setFont('undefined', 'normal');

      selectedPackage.extras.forEach((feature) => {
        yPosition += 7;
        doc.text(`• ${feature}`, 20, yPosition);
      });
    }

    // Precio
    yPosition += 15;
    doc.setFontSize(16);
    doc.text('Total:', 15, yPosition);
    doc.setFontSize(20);
    const precio = selectedPackage.price ?? 0; // Si es undefined, usa 0
    doc.text(this.formatPrice(precio), 15, yPosition + 10);
    doc.setFontSize(12);
    yPosition += 15;
    doc.text(
      'Nota: El precio puede variar dependiendo de la temporada.',
      15,
      yPosition
    );
    yPosition += 7;

    // Datos bancarios
    yPosition += 15;
    doc.setFontSize(14);
    doc.text('Datos para transferencia:', 15, yPosition);

    this.bankAccounts.forEach((account) => {
      doc.setFontSize(12);
      yPosition += 7;
      doc.text(`Banco: ${account.banco}`, 20, yPosition);
      yPosition += 7;
      doc.text(`Cuenta: ${account.cuenta}`, 20, yPosition);
      if (account.clabe) {
        yPosition += 7;
        doc.text(`CLABE: ${account.clabe}`, 20, yPosition);
      }
      yPosition += 7;
      doc.text(`Titular: ${account.titular}`, 20, yPosition);
    });

    // Contacto
    yPosition += 15;
    doc.setFontSize(14);
    doc.text('Confirmación:', 15, yPosition);
    doc.setFontSize(12);
    yPosition += 7;
    doc.text(`WhatsApp: ${this.whatsappNumber}`, 20, yPosition, {
      maxWidth: 170,
    });

    doc.save(`contrato-${selectedPackage.name.toLowerCase()}.pdf`);
  }

  async generateCustomServicePDF() {
    const doc = new jsPDF();

    // --- LOGO ---
    try {
      const logoUrl =
        'https://res.cloudinary.com/drsyb53ae/image/upload/f_auto,q_auto/v1/logotiposPortafolioFotografico/ae260gsv7klrwzv3skf5';
      const logoData = await this.getBase64Image(logoUrl);
      const logoWidth = 30;
      const logoHeight = 30;
      const pageWidth = doc.internal.pageSize.getWidth();
      doc.addImage(
        logoData,
        'PNG',
        pageWidth - logoWidth - 15,
        15,
        logoWidth,
        logoHeight
      );
    } catch (error) {
      console.warn('Error al cargar logo:', error);
    }

    // --- ENCABEZADO ---
    let yPosition = 25;
    doc.setFontSize(18);
    doc.text(`Cotización de Servicio Personalizado`, 15, yPosition);

    doc.setFontSize(14);
    yPosition += 10;
    doc.text(
      `Fecha: ${
        this.selectedDate.value?.toLocaleDateString() || 'Por definir'
      }`,
      15,
      yPosition
    );
    yPosition += 15;

    // --- SECCIÓN FOTOGRAFÍA ---
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Fotografía:', 15, yPosition);
    doc.setFont('helvetica', 'normal');
    yPosition += 7;
    doc.text(`• ${this.duration()} horas de cobertura`, 20, yPosition);
    yPosition += 7;
    doc.text(
      `• ${this.formatPhotos(this.photos())} fotos digitales`,
      20,
      yPosition
    );

    // --- SECCIÓN EXTRAS ---
    if (this.includeDrone() || this.includeAlbum() || this.videoHours() > 0) {
      yPosition += 12;
      doc.setFont('normal', 'bold');
      doc.text('Servicios Adicionales:', 15, yPosition);
      doc.setFont('normal', 'normal');

      if (this.includeDrone()) {
        yPosition += 7;
        doc.text(`• Cobertura con dron (+$1,500)`, 20, yPosition);
      }

      if (this.includeAlbum()) {
        yPosition += 7;
        doc.text(`• Álbum físico premium (+$1,000)`, 20, yPosition);
      }
      if (this.videoHours() > 0) {
        yPosition += 7;
        doc.text(
          `• ${this.videoHours()} hrs de cobertura de video (+${this.formatPrice(
            this.videoHours() * this.videoPricePerHour
          )})`,
          20,
          yPosition
        );
      }
    }

    // --- SECCIÓN NOTAS ---
    if (this.isHighSeason) {
      yPosition += 12;
      doc.setFont('normal', 'bold');
      doc.text('Notas:', 15, yPosition);
      doc.setFont('normal', 'normal');
      yPosition += 7;
      doc.setTextColor(200, 0, 0);
      doc.text(`• Temporada alta (recargo aplicado)`, 20, yPosition);
      doc.setTextColor(0);
    }

    // --- SECCIÓN TOTAL ---
    yPosition += 20;
    doc.setFontSize(16);
    doc.text('Total Estimado:', 15, yPosition);
    doc.setFontSize(20);
    doc.text(this.formatPrice(this.calculatePrice()), 15, yPosition + 10);

    // --- SECCIÓN DATOS BANCARIOS ---
    yPosition += 25;
    doc.setFontSize(14);
    doc.text('Datos para depósito:', 15, yPosition);

    this.bankAccounts.forEach((account) => {
      doc.setFontSize(12);
      yPosition += 7;
      doc.text(`Banco: ${account.banco}`, 20, yPosition);
      yPosition += 7;
      doc.text(`Cuenta: ${account.cuenta}`, 20, yPosition);
      if (account.clabe) {
        yPosition += 7;
        doc.text(`CLABE: ${account.clabe}`, 20, yPosition);
      }
      yPosition += 7;
      doc.text(`Titular: ${account.titular}`, 20, yPosition);
    });

    // --- SECCIÓN CONTACTO ---
    yPosition += 15;
    doc.setFontSize(14);
    doc.text('Confirmación:', 15, yPosition);
    doc.setFontSize(12);
    yPosition += 7;
    doc.text(`WhatsApp: ${this.whatsappNumber}`, 20, yPosition, {
      maxWidth: 170,
    });

    doc.save(
      `presupuesto-personalizado-${new Date().toISOString().slice(0, 10)}.pdf`
    );
  }

  // Método auxiliar para imágenes
  private async getBase64Image(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = url;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          resolve(canvas.toDataURL('image/png'));
        } else {
          reject(new Error('No se pudo obtener contexto 2D'));
        }
      };
      img.onerror = (err) => reject(err);
    });
  }

  // Método auxiliar para dimensiones de imagen (opcional)
  private async getImageDimensions(
    url: string
  ): Promise<{ width: number; height: number }> {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () =>
        resolve({
          width: img.naturalWidth,
          height: img.naturalHeight,
        });
      img.src = url;
    });
  }
}
