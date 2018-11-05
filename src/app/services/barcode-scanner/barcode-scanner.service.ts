import { WindowRefService } from './../window-ref/window-ref.service';
import { Injectable } from '@angular/core';
import Quagga from 'quagga';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BarcodeScannerService {

  private onBarcodeScanned: Subject<string>;

  constructor(private windowRef: WindowRefService) { }

  stopScanner() {
    Quagga.stop();
  }

  startScanner(target: string) {
    Quagga.init({
      inputStream: {
        name: 'Live',
        type: 'LiveStream',
        // target: target,
        target: document.querySelector(target),
        constraints: {
          width: this.windowRef.nativeWindow.width,
          height: this.windowRef.nativeWindow.height,
          facingMode: 'environment'
        },
      },
      decoder: {
        readers: [
          'code_128_reader',
          'ean_reader',
          'ean_8_reader',
          'code_39_reader',
          'code_39_vin_reader',
          'codabar_reader',
          'upc_reader',
          'upc_e_reader',
          'i2of5_reader'
        ],
        debug: {
          showCanvas: true,
          showPatches: true,
          showFoundPatches: true,
          showSkeleton: true,
          showLabels: true,
          showPatchLabels: true,
          showRemainingPatchLabels: true,
          boxFromPatches: {
            showTransformed: true,
            showTransformedBox: true,
            showBB: true
          }
        }
      },

    }, function (err) {
      if (err) {
        console.log(err);
        return;
      }
      Quagga.start();
    });

    Quagga.onDetected((result) => {
      alert(result.codeResult.code);
      console.log('Barcode detected and processed : [' + result.codeResult.code + ']', result);
      this.onBarcodeScanned.next(result.codeResult.code);
    });

    this.onBarcodeScanned = new Subject();
    return this.onBarcodeScanned;
  }
}
