type Props = {
    children: React.ReactNode
}


export const StickeyWrapper = ( { children}:Props) => {
  return (
    <div className="hidden lg:block w-[368px] sticky bottom-6">
      <div className="min-h-[clac(100vh-48px)] sticky self-end-safe  top-6 flex flex-col gap-y-4">
        {children}
      </div>
    </div>
  )
}


