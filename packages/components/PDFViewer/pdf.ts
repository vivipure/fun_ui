import * as _PDFJS from "pdfjs-dist/legacy/build/pdf";
import { PDFLinkService } from "pdfjs-dist/legacy/web/pdf_viewer";
import {
  PDFDocumentProxy,
  PDFPageProxy,
} from "pdfjs-dist/types/src/display/api";

const pdfjsWorker = new URL("./pdf.worker.js", import.meta.url);
_PDFJS.GlobalWorkerOptions.workerSrc = pdfjsWorker.href;

export class PDFLoader {
  pdfDOC: PDFDocumentProxy | undefined;
  linkService: PDFLinkService = new PDFLinkService();
  wrapperWidth: number | undefined;

  async loadDocument(src: string, wrapper?: HTMLDivElement) {
    const task = _PDFJS.getDocument(src);
    try {
      const res = await task.promise;
      this.pdfDOC = res;
      this.linkService.setDocument(this.pdfDOC);
      if (wrapper) {
        this.wrapperWidth = wrapper.clientWidth;
      }
    } catch (e) {
      console.log(e);
    }
  }

  async loadPage(page = 1, el: HTMLCanvasElement) {
    const pdfPage = (await this.pdfDOC?.getPage(page)) as PDFPageProxy;
    let viewport = pdfPage.getViewport({ scale: 1 });
    if (this.wrapperWidth) {
    }
    const scale = this.wrapperWidth ? this.wrapperWidth / viewport.width : 1;
    viewport = pdfPage.getViewport({ scale });

    el.width = viewport.width;
    el.height = viewport.height;
    pdfPage.render({
      canvasContext: el.getContext("2d") as Object,
      viewport: viewport,
    });
  }
}
