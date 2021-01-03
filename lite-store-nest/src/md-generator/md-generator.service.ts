import { Injectable } from '@nestjs/common';
import {
  mdTemplate1,
  mdTemplate2,
  mdTemplate3,
  mdTemplate4,
} from './md-template.const';
const fs = require('fs');

@Injectable()
export class MdGeneratorService {
  create() {
    const targetFolder = './md-generates-files/';

    for (let i = 1; i <= 100; i++) {
      const path = targetFolder + i + '.md';
      const content =
        mdTemplate1 +
        i +
        mdTemplate2 +
        (i * 100 + i) +
        mdTemplate3 +
        i +
        mdTemplate4;

      fs.writeFile(path, content, err => {
        if (err) {
          console.error(err);
          return;
        }
        //file written successfully
      });
    }
  }
}
