interface PhotoAlbumIconProps {
  className?: string;
  onClick?: () => void;
}

export function PhotoAlbumIcon(props: PhotoAlbumIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 2h5v7l-2.5-1.5L11 11V4zM7 18l2.38-3.17L11 17l2.62-3.5L17 18H7z"></path>
    </svg>
  );
}
