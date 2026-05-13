import "./overview.css";
import { Section01 } from "./Section01";    
import { Section02 } from "./Section02";    
import { Section03 } from "./Section03";    
import { Section04 } from "./Section04";    
import { Section05 } from "./Section05";    


export const Overview = () => {
  return (
    <div>
      <div className="section-column" style={{gap: "120px"}}>
        <Section01 />
        <Section02 />
        <Section03 />
        <Section04 />
        <Section05 />
      </div>
    </div>
  )
}