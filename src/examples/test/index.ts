import fs from "fs";
import path from "path";

import { Document } from "../../";

// const doc = new Document();
const doc = Document.parseHTML('<div data-v-f6ef564a="" class="thinkive-editor" contenteditable="true">在漫长的<span class="say-as" contenteditable="false" data-interpret-as="cardinal">300<small data-after="整数"></small><em>&#xFEFF;</em></span>万年历史<span class="phoneme" contenteditable="false" data-py="zhōng">中<small data-after="zhōng"></small><em>&#xFEFF;</em></span>，人类在不断的进化。</div>');
const result = doc.render();

fs.writeFileSync(path.join(__dirname, "result.xml"), result);
