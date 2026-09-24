import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts'
import skills from '@/config/skills.json'

/** Core-competency radar chart driven by skills.json → radar[]. */
export default function RadarChartCard() {
  const data = skills.radar || []

  return (
    <div className="h-[320px] w-full sm:h-[380px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} outerRadius="72%">
          <PolarGrid stroke="rgb(var(--c-border))" />
          <PolarAngleAxis
            dataKey="axis"
            tick={{ fill: 'rgb(var(--c-text-muted))', fontSize: 12 }}
          />
          <PolarRadiusAxis
            domain={[0, 100]}
            tick={false}
            axisLine={false}
          />
          <Radar
            name="Proficiency"
            dataKey="value"
            stroke="rgb(var(--c-primary))"
            strokeWidth={2}
            fill="rgb(var(--c-primary))"
            fillOpacity={0.28}
            isAnimationActive
            animationDuration={1200}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
