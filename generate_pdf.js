import fs from 'fs'
import PDFDocument from 'pdfkit'

const doc = new PDFDocument()
doc.pipe(fs.createWriteStream('api_documentation.pdf'))

const content = fs.readFileSync('api_documentation.md', 'utf8')

doc.fontSize(16).text('API Documentation: Manhwa Sites Ranking', { align: 'center' })
doc.moveDown(2)

const lines = content.split('\n')
for (const line of lines) {
  if (line.startsWith('# ')) {
    // Skip title since we already added it
    continue
  } else if (line.startsWith('## ')) {
    doc.moveDown()
    doc.fontSize(14).text(line.replace('## ', ''), { continued: false })
    doc.moveDown(0.5)
  } else if (line.startsWith('### ')) {
    doc.moveDown()
    doc.fontSize(12).text(line.replace('### ', ''), { continued: false })
    doc.moveDown(0.5)
  } else if (line.startsWith('- **')) {
    doc.fontSize(10).text(line, { indent: 20 })
  } else {
    doc.fontSize(10).text(line)
  }
}

doc.end()
