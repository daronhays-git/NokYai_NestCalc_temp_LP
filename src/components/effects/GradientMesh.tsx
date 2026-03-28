interface GradientMeshProps {
  colors?: [string, string, string]
  className?: string
}

export function GradientMesh({
  colors = ['#F59E0B', '#0d9488', '#0f2920'],
  className = '',
}: GradientMeshProps) {
  const blobs = [
    { x: '20%', y: '20%', delay: '0s' },
    { x: '60%', y: '50%', delay: '-7s' },
    { x: '40%', y: '70%', delay: '-14s' },
  ]

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {blobs.map((blob, i) => (
        <div
          key={i}
          className="absolute w-[40vw] h-[40vw] rounded-full blur-[120px] animate-[mesh-drift_24s_ease-in-out_infinite]"
          style={{
            left: blob.x,
            top: blob.y,
            background: `radial-gradient(circle, ${colors[i]}44 0%, transparent 70%)`,
            animationDelay: blob.delay,
          }}
        />
      ))}
    </div>
  )
}
