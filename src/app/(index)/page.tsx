// app/page.tsx
'use client'

import GridContainer from '@/components/GridContainer'
import ProjectNav from '@/components/home/ProjectNav'
import ProfileNav from '@/components/home/ProfileNav'


export default function Home() {
    return (
        <GridContainer
            className="
        grid
        grid-cols-1          /* mobile: one column */
        md:grid-cols-12      /* md+ : 12-col grid */
        md:h-screen          /* md+ : full viewport height */
        md:overflow-hidden    /* md+ : hide outer scroll */
        gap-4
      "
        >
            {/* Sidebar */}
            <aside
                className="
+   flex flex-col h-full
    col-span-1
    md:col-span-2
    md:sticky md:top-0
    mt-4
    bg-white
  "
            >
                <p>Alex Luowan</p>

                <p className="mt-4">
                    I’m Alex, a product and brand designer focusing on ✷ intuitive interaction flows,
                    ◎ cohesive visual identities, and ✺ inclusive design systems.
                </p>

                <div className="mt-4">
                    <ProjectNav/>
                </div>

                {/* now this one will get pushed to the bottom */}
                <div className="mt-auto">

                    <ProfileNav/>

                </div>
            </aside>


            {/* Main content */}
            <main
                className="
          col-span-1
          md:col-span-10
          md:col-start-4
          overflow-y-auto       /* scrollable pane on md+ */
          mt-4
        "
            >


                {/* …more ProjectCard components */}
            </main>
        </GridContainer>
    )
}
