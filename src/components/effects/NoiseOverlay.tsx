export function NoiseOverlay() {
  return (
    <>
      <svg className="hidden">
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
      </svg>
      <div
        className="fixed inset-0 z-[60] pointer-events-none mix-blend-overlay opacity-[0.05]"
        aria-hidden="true"
        style={{
          filter: 'url(#noiseFilter)',
          width: '100%',
          height: '100%',
        }}
      />
    </>
  )
}
