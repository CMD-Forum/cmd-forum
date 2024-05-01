"use client";

import MarkdownPreview from '@uiw/react-markdown-preview';

export default function V1_1_UpdatePage() {

const source = `

# Version 1.1 is here!
Well, [\`Version 1.1\`](https://github.com/CMD-Forum/cmd-forum) is here at last! Only took 20 years.
## New Features
- **Completely new user interface**:

  - New Navigation
  - Updates to general layout
  - New settings page
  - New about & updates pages.
  - New dropdowns
  - New bottomsheet component (still buggy)
  - New modal component

`;

    return (

        <main className="flex min-h-screen flex-col w-full">

            <div className="error flex flex-col w-full">
  
              <div className="flex flex-col border-b-1 border-border p-6 pt-12 lg:pb-12 lg:p-12 lg:px-48">
  
                  <h1 className="header">Updates</h1>
                  <p className="subtitle">Version 1.1</p>   
  
              </div>
  
              <div className='flex flex-col px-6 lg:py-12 lg:px-48 mt-6 mb-6'>
                <MarkdownPreview source={source} />
              </div>
  
          </div>
  
      </main>

    );

}