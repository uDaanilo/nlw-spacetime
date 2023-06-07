'use client'

import { ChangeEvent, useState } from 'react'

export function MediaPicker() {
  const [preview, setPreview] = useState<string | null>(null)
  function onFileSelected(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return

    const previewUrl = URL.createObjectURL(e.target.files[0])

    setPreview(previewUrl)
  }

  return (
    <>
      <input
        type="file"
        name="coverUrl"
        accept="image/*,video/*"
        id="media"
        onChange={onFileSelected}
        className="invisible h-0 w-0"
      />
      {preview && (
        // eslint-disable-next-line
        <img
          src={preview}
          alt="Preview"
          className="aspect-video w-full rounded-lg object-cover"
        />
      )}
    </>
  )
}
