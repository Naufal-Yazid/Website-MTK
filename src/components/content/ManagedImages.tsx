'use client'

import { createContext, useContext, useState, type ReactNode, type ImgHTMLAttributes, type HTMLAttributes } from 'react'
import NextImage, { type ImageProps } from 'next/image'
import type { ImageMap } from '@/lib/media/model'

const ImagesContext = createContext<ImageMap>({})
export function ImagesProvider({ images, children }: { images: ImageMap; children: ReactNode }) {
  return <ImagesContext.Provider value={images}>{children}</ImagesContext.Provider>
}
export function useManagedImage(src: string) {
  return useContext(ImagesContext)[src] || src
}

// Keep original dimensions, alt text and cover/contain rules at each existing placement.
export function ManagedImg({ src = '', alt, onError, ...props }: Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> & { src?: string }) {
  const mapped = useManagedImage(src)
  const [failed, setFailed] = useState('')
  const resolved = failed === mapped ? src : mapped
  // eslint-disable-next-line @next/next/no-img-element -- Preserve existing native image placements and fallback.
  return <img {...props} src={resolved} alt={alt} onError={event => { setFailed(mapped); onError?.(event) }} />
}
export function ManagedImage({ src, alt, onError, ...props }: ImageProps) {
  const mapped = useManagedImage(typeof src === 'string' ? src : '')
  const [failed, setFailed] = useState('')
  const replacement = typeof src === 'string' && mapped !== src && failed !== mapped
  return <NextImage {...props} src={replacement ? mapped : src} alt={alt} unoptimized={replacement || props.unoptimized} onError={event => { setFailed(mapped); onError?.(event) }} />
}
export function ManagedBackground({ src, style, ...props }: HTMLAttributes<HTMLDivElement> & { src: string }) {
  const mapped = useManagedImage(src)
  // A second CSS layer keeps the original banner if the replacement cannot load.
  const backgroundImage = mapped === src ? 'url(' + JSON.stringify(src) + ')' : 'url(' + JSON.stringify(mapped) + '), url(' + JSON.stringify(src) + ')'
  return <div {...props} style={{ ...style, backgroundImage }} />
}
