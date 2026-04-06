import { useRef, useState } from 'react'
import { adminApi } from './adminApi'
import { HiOutlinePhoto, HiOutlineXMark, HiOutlineArrowUpTray } from 'react-icons/hi2'

/**
 * Single or multiple image/file uploader.
 *
 * Props:
 *  - value      : string (single URL) or string[] (multi URLs)
 *  - onChange   : (url: string) => void  |  (urls: string[]) => void
 *  - label      : string  (shown on button)
 *  - accept     : string  (default "image/*")
 *  - multiple   : bool    (default false)
 *  - onMultiAdd : (urls: string[]) => void  — called per-batch when multiple=true
 *                 if provided, onChange is NOT called
 */
export default function ImageUpload({
  value = '',
  onChange,
  label = 'Choisir une image',
  accept = 'image/*',
  multiple = false,
  onMultiAdd,
}) {
  const inputRef = useRef()
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress]  = useState(0)

  const handleFiles = async (files) => {
    if (!files || files.length === 0) return
    setUploading(true)
    setProgress(0)
    try {
      const list = [...files]
      const urls = []
      for (let i = 0; i < list.length; i++) {
        const { url } = await adminApi.uploadFile(list[i])
        urls.push(url)
        setProgress(Math.round(((i + 1) / list.length) * 100))
      }
      if (multiple && onMultiAdd) {
        onMultiAdd(urls)
      } else {
        onChange(multiple ? urls : urls[0])
      }
    } catch (e) {
      alert('Erreur upload : ' + e.message)
    } finally {
      setUploading(false)
      setProgress(0)
      // reset input so same file can be re-selected
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  const isImage = (url) => url && /\.(jpg|jpeg|png|gif|webp|svg)(\?|$)/i.test(url)

  return (
    <div className="img-upload-wrap">
      {/* Single image preview */}
      {!multiple && value && (
        <div className="img-upload-preview">
          {isImage(value)
            ? <img src={value} alt="aperçu" />
            : <div className="img-upload-file-badge">{value.split('/').pop()}</div>
          }
          <button
            type="button"
            className="img-upload-clear"
            title="Supprimer"
            onClick={() => onChange('')}
          >
            <HiOutlineXMark />
          </button>
        </div>
      )}

      {/* Upload row */}
      <div className="img-upload-row">
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          style={{ display: 'none' }}
          onChange={e => handleFiles(e.target.files)}
        />
        <button
          type="button"
          className="btn btn-ghost btn-sm img-upload-btn"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
        >
          {uploading
            ? <><span className="img-upload-spinner" />{progress > 0 ? `${progress}%` : 'Envoi…'}</>
            : <><HiOutlineArrowUpTray />{(!multiple && value) ? 'Changer' : label}</>
          }
        </button>
        {!multiple && !value && (
          <span className="img-upload-hint">JPG, PNG, WEBP — max 10 Mo</span>
        )}
      </div>
    </div>
  )
}
