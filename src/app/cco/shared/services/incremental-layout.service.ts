import { Injectable } from '@angular/core';
import * as go from 'gojs';

@Injectable({
  providedIn: 'root'
})
export class IncrementalLayoutService extends go.Layout {
  angle : any = 90;
  constructor() {
    super();
    function IncrementalLayout() {
      go.Layout.call(this);
      // this.angle = 0;  // or 90 or 180 or 270
    }
    go.Diagram.inherit(IncrementalLayout, go.Layout);
  }
  
  findUnoccupiedRect(bounds, size, skip) { 

    var diag = this.diagram;
    if (!diag) return null;
    var angle = this.angle;
    if (skip === undefined) skip = null;
    var r = new go.Rect(bounds.x, bounds.y, size.width, size.height);
    var a, b, ma, mb, da, db;
    if (angle === 0) {
      a = bounds.left; ma = Infinity; /*bounds.right - size.width;*/ da = 8;
      b = bounds.top; mb = bounds.bottom - size.height; db = 8;
    } else if (angle === 90) {
      a = bounds.top; ma = Infinity; /*bounds.bottom - size.height;*/ da = 8;
      b = bounds.left; mb = bounds.right - size.width; db = 8;
    } else if (angle === 180) {
      a = bounds.right - size.width; ma = -Infinity; /*bounds.left;*/ da = -8;
      b = bounds.top; mb = bounds.bottom - size.height; db = 8;
    } else if (angle === 270) {
      a = bounds.bottom - size.height; ma = -Infinity; /*bounds.top;*/ da = -8;
      b = bounds.left; mb = bounds.right - size.width; db = 8;
    } else {
      throw new Error("unknown angle for findUnoccupiedRect: " + angle);
    }
    var s = b;
    for (; (da > 0) ? a < ma : a > ma; a += da) {
      if (angle === 0 || angle === 180) {
        r.x = a;
      } else {
        r.y = a;
      }
      for (; (db > 0) ? b < mb : b > mb; b += db) {
        if (angle === 0 || angle === 180) {
          r.y = b;
        } else {
          r.x = b;
        }
        var empty = diag['isUnoccupied'](r, skip);
        if (empty) return r;
      }
      b = s;
    }
    return null; 
  }
  

  doLayout(coll) {

    var diag = this.diagram;
    if (!diag) return;
    var all = this.collectParts(coll);
    var need = [];
    all.each(p => {
      if (p instanceof go.Link) return;
      var b = p.actualBounds;
      if (isNaN(b.x) || isNaN(b.y)) need.push(p);
    });
    var b = new go.Rect(this.arrangementOrigin, diag.viewportBounds.copy().inflate(-8, -8).size);
    need.forEach(p => {
      var r = this.findUnoccupiedRect(b, p.actualBounds.size, undefined);
      if (r) p.move(r.position);
    });
  }
  
}
