import * as React from "react"
import clsx from "clsx"

type ImageProps = React.ImgHTMLAttributes<HTMLImageElement>

export function Image({ className, ...props }: ImageProps) {
  return (
    <img
      {...props}
      className={clsx("block w-full h-full object-cover", className)}
      loading="lazy"
    />
  )
}
