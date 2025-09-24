
const Nav=()=>{
    return(
        <div className="p-8 bg-white min-h-screen">
            <h1 className="text-4xl font-bold mb-6 text-blue-500 md:text-red-500 lg:text-green-500">
                Tailwind Breakpoint Test
            </h1>
            
            <div className="grid gap-4">
                <div className="p-4 bg-blue-100 text-blue-800 md:bg-red-100 md:text-red-800 lg:bg-green-100 lg:text-green-800">
                    <strong>Tailwind Test:</strong> Blue → Red (md: 768px+) → Green (lg: 1024px+)
                </div>
                
                <div className="p-4 bg-gray-200 text-gray-800 sm:bg-yellow-200 sm:text-yellow-800 md:bg-orange-200 md:text-orange-800 lg:bg-purple-200 lg:text-purple-800">
                    <strong>Full Test:</strong> Gray → Yellow (sm: 640px+) → Orange (md: 768px+) → Purple (lg: 1024px+)
                </div>
                
                <div className="p-4 bg-pink-100 text-pink-800">
                    <strong>Control:</strong> This should stay pink
                </div>
            </div>
            
            <div className="mt-8 p-4 border-2 border-dashed border-gray-300">
                <p className="text-sm text-gray-600">
                    <strong>Instructions:</strong> Resize your browser window. The first two boxes should change colors at different breakpoints.
                </p>
                <p className="text-xs text-gray-500 mt-2">
                    Breakpoints: sm (640px), md (768px), lg (1024px)
                </p>
            </div>
        </div>
    )
}

export default Nav;