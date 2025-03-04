import React, { useContext, useRef, useState, useEffect } from 'react'
import { AppContext } from '../contexts/AppContext'
import PDFDisplay from './PDFDisplay'
import DesignColors from './DesignColors'
import Modal from '../components/Modal'

import { createPDF, templateList } from './templates/Renderer'

const Design = ({ active }: { active: boolean }) => {
  const { sections, header, activeTemplate, setTemplate, colors } = useContext(AppContext)
  const [document, setDocument] = useState(null)

  const [showModal, setShowModal] = useState(false)
  const downloadActive = () => {
    const document = activeTemplate.render(sections, header)
    const pdf = createPDF(document)
    pdf.download(`Resume - ${header.name}.pdf`)
    setShowModal(true)
  }

  const [loading, setLoading] = useState(true)
  const effectDocument = async () => {
    if (colors) {
      activeTemplate.setColors(colors)
    } else {
      activeTemplate.setColors(activeTemplate.defaultColors)
    }
    const document = activeTemplate.render(sections, header)
    const pdf = createPDF(document)
    await pdf.getDataUrl((url: string) => {
      // @ts-ignore currently no typing for pdf-make
      setDocument(url)
    })
  }
  useEffect(() => {
    if (!active) {
      return
    }
    setLoading(true)
    effectDocument()
    setLoading(false)
  }, [activeTemplate, colors])
  useEffect(() => {
    if (!active) {
      return
    }
    setLoading(true)
    setTimeout(() => {
      effectDocument()
      setLoading(false)
    }, 1200)
  }, [active])

  return (
    <div id="design">
      <div className="component-container">
        <div className="design__title">
          <h1>Design</h1>
          <button className="btn btn-primary" onClick={downloadActive}>Download Resume</button>
        </div>
        <div className="design">
          <div className="design__preview">
            <PDFDisplay document={document} loading={loading} />
          </div>
          <div className="design__actions">
            <h3>Template</h3>
            {templateList.map((template) => {
              return (
                <button
                  key={template.name}
                  className={`btn ${activeTemplate.name === template.name ? 'btn-accent' : ''}`}
                  onClick={() => setTemplate(template.name)}
                >
                  {template.name}
                </button>
              )
            })}
            <DesignColors />
            <button className="btn btn-primary" style={{ width: '100%', margin: '1rem 0' }} onClick={downloadActive}>Download Resume</button>
          </div>
        </div>
      </div>
      <Modal show={showModal} title="Enjoy your Resume" close={() => setShowModal(false)}>
        <div className="text--center">
          <p>If you need to make changes to this resume, you can re-upload the PDF to continue where you left off.</p>
          <p>Comments, issues, or feature requests? Email at: <a href="mailto:createresume@chandi.ca" className="link">createresume@chandi.ca</a></p>
          <p>Good luck!</p>
        </div>
      </Modal>
    </div>
  )
}

export default Design