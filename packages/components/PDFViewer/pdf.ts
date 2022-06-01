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

  async loadDocument(src: string) {
    const task = _PDFJS.getDocument(src);
    try {
      const res = await task.promise;
      this.pdfDOC = res;
      this.linkService.setDocument(this.pdfDOC);
    } catch (e) {
      console.log(e);
    }
  }

  async loadPage(page = 1, el: HTMLCanvasElement) {
    const pdfPage = (await this.pdfDOC?.getPage(page)) as PDFPageProxy;
    var viewport = pdfPage.getViewport({ scale: 1 });
    el.width = viewport.width;
    el.height = viewport.height;
    pdfPage.render({
      canvasContext: el.getContext("2d") as Object,
      viewport: viewport,
    });
  }
}
