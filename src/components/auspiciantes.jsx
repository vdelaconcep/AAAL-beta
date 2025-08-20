import roher from '../assets/img/auspiciantes/roher.jpg';
import abcelectro from '../assets/img/auspiciantes/abcelectro.jpg';
import gvelectro from '../assets/img/auspiciantes/gvelectro.jpg';
import madersul from '../assets/img/auspiciantes/mader_sul.jpg';
import jotabe from '../assets/img/auspiciantes/jotabe.jpg';

const Auspiciantes = () => {
    return (
        <section className='bg-sky-600 my-6'>
            <p className='text-center font-semibold p-0 py-2'>Nos acompañan:</p>
            <div className='flex flex-wrap justify-center py-2'>
                <img src={roher} className='h-20 m-1 rounded-xl' alt="Roher materiales eléctricos" />
                <a href="https://electroabc.com.ar/" target="_blank" rel="noopener noreferrer" title="electroabc.com.ar">
                    <img src={abcelectro} className='h-20 m-1 rounded-xl hover:scale-105 transition-transform duration-300 ease-in-out' alt="ABC electro" />
                </a>
                <a href="https://electrogv.com.ar/" target="_blank" rel="noopener noreferrer" title="electrogv.com.ar">
                    <img src={gvelectro} className='h-20 m-1 rounded-xl hover:scale-105 transition-transform duration-300 ease-in-out' alt="GV electro" />
                </a>
                <a href="https://www.madersul.com.ar/" target="_blank" rel="noopener noreferrer" title="madersul.com.ar">
                    <img src={madersul} className='h-20 m-1 rounded-xl hover:scale-105 transition-transform duration-300 ease-in-out' alt="Mader-Sul S.R.L." />
                </a>
                <img src={jotabe} className='h-20 m-1 rounded-xl' alt="Creaciones Jotabe" />
            </div>
        </section>
    );
}

export default Auspiciantes;
