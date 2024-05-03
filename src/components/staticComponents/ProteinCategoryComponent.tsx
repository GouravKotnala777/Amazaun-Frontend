import "../../styles/staticComponents/eaas_category_component.scss";

const ProteinCategoryComponent = () => {

    return(
        <div className="category_Cont">
                    <div className="main_heading">PROTEIN</div>
            <div className="sub_heading">WHAT IS PROTEIN?</div>
            <div className="para">
                Protein is a macronutrient essential for the growth, repair, and maintenance of tissues in the body. It is composed of amino acids, which are the building blocks of protein molecules.
            </div>


            <div className="sub_heading">SOURCES OF PROTEIN:</div>
            <div className="para">
                Protein can be obtained from both animal and plant sources. Animal sources include meat, poultry, fish, eggs, and dairy products. Plant sources include legumes, nuts, seeds, and grains. It's important to consume a variety of protein sources to ensure adequate intake of all essential amino acids.
            </div>


            <div className="sub_heading">ROLE OF PROTEIN IN THE BODY:</div>
            <div className="para">
                Protein plays a variety of crucial roles in the body, including:
                <ul>
                    <li>Building and repairing tissues: Protein is necessary for the growth and repair of muscles, organs, skin, hair, and nails.</li>
                    <li>Enzymes and hormones: Many enzymes and hormones are proteins, which are involved in various metabolic processes and signaling pathways in the body.</li>
                    <li>Immune function: Antibodies, which are proteins, play a key role in the immune system's defense against pathogens.</li>
                    <li>Transportation and storage: Proteins such as hemoglobin transport oxygen in the blood, and some proteins serve as storage molecules for nutrients.</li>
                </ul>
            </div>


            <div className="sub_heading">RECOMMENDED PROTEIN INTAKE:</div>
            <div className="para">
                The recommended daily intake of protein varies depending on factors such as age, sex, weight, and activity level. In general, it is recommended to consume about 0.8 grams of protein per kilogram of body weight per day for the average adult. However, athletes, bodybuilders, and individuals engaged in intense physical activity may require higher protein intake to support muscle growth and repair.
            </div>
            
        </div>
    )
};

export default ProteinCategoryComponent;