import { Button } from "@/components/ui/button";
import Sidebar from "@/components/sidebar";

 export default  function Page() {
  return (
    <div className={'grid grid-cols-[64px,1fr] h-screen max-w-screen-2xl mx-auto overflow-hidden  max-md:grid-cols-1 max-md:grid-rows-[64px,1fr] '}>
        <Sidebar/>
        <div className={' overflow-auto p-8'}>
            <Button variant={"default"} className={''}>Hello world</Button>
        </div>
    </div>
  );
}