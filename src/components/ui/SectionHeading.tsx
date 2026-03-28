interface SectionHeadingProps {
  title: string
  subtitle?: string
  accentColor?: string
}

export function SectionHeading({
  title,
  subtitle,
  accentColor = '#F59E0B',
}: SectionHeadingProps) {
  return (
    <div className="mb-16">
      <h2 className="font-display text-section text-white">{title}</h2>
      <div
        className="w-16 h-1 rounded-full mt-4"
        style={{ backgroundColor: accentColor }}
      />
      {subtitle && (
        <p className="text-nok-caption text-lg mt-4">{subtitle}</p>
      )}
    </div>
  )
}
