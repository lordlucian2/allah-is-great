import { motion } from 'motion/react';
import { Target, Eye, Award, Shield, CheckCircle, Smartphone, HelpCircle, Users } from 'lucide-react';
import { TEAM_MEMBERS } from '../data';

interface AboutProps {
  darkMode: boolean;
}

export default function About({ darkMode }: AboutProps) {
  return (
    <div className={`transition-colors duration-300 ${
      darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'
    }`}>
      
      {/* 1. HERO STORY GRID WITH ACCENT TEAM PHOTO MOCKUP */}
      <section className="relative overflow-hidden py-16 sm:py-24">
        
        {/* Background Visual elements */}
        <div className="absolute inset-0 z-0 opacity-40">
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Texts Story Box */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <span className="text-xs uppercase font-mono tracking-widest text-amber-500 font-bold">
                About Us: Our Story
              </span>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
                Innovating for Your Future
              </h1>
              <div className="w-16 h-1.5 bg-amber-500 rounded-full" />
              
              <div className={`space-y-4 text-sm sm:text-base leading-relaxed ${
                darkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                <p>
                  Founded with a deep-seated commitment to bringing premium household electronic and electrical solutions to Monrovia, <strong>ALLAH IS GREAT</strong> has grown from a humble local supplier into a trusted partner for retail consumers and project developers alike.
                </p>
                <p>
                  We believe in technology that empowers, enriches, and safeguards human lives. By prioritizing rigorous hardware inspection, direct global sourcing, and unyielding support, we ensure that every smart speaker, surge protector socket, or smartphone purchased from our catalog operates flawlessly under local grids.
                </p>
              </div>
            </div>

            {/* Right picture mockup */}
            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 aspect-video max-h-[350px]">
                {/* Team photo placeholder illustrating a group of friendly technicians and managers */}
                <img 
                  src="https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=800&q=80" 
                  alt="ALLAH IS GREAT store support team" 
                  className="w-full h-full object-cover filter brightness-95 saturate-100 dark:saturate-75"
                />
                
                {/* Visual badge overlay */}
                <div className="absolute bottom-5 left-5 bg-slate-950/80 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10 text-xs text-white">
                  <p className="font-bold">Monrovia Retail Outlet</p>
                  <p className="text-slate-400 text-[10px] mt-0.5">Opposite New Georgia Estate blocks</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* 2. VISION AND MISSION CARDS */}
      <section className={`py-16 border-y ${
        darkMode ? 'bg-slate-900/40 border-slate-900' : 'bg-slate-100 border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-2 mb-12">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight uppercase text-amber-500">Our Vision & Mission</h2>
            <div className="w-12 h-1 bg-amber-500 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Vision */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`p-8 rounded-2xl border text-left space-y-4 ${
                darkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl w-12 h-12 flex items-center justify-center border border-amber-500/20 shadow-inner">
                <Target size={24} />
              </div>
              <h3 className="text-lg font-black tracking-tight text-slate-900 dark:text-white">Our Vision</h3>
              <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                To be the leading, most trusted destination for cutting-edge electronics and durable electrical engineering fittings across Liberia. We aim to make verified high-spec technology accessible, safe, and easily deployable for every local customer.
              </p>
            </motion.div>

            {/* Mission */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`p-8 rounded-2xl border text-left space-y-4 ${
                darkMode ? 'bg-slate-955 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl w-12 h-12 flex items-center justify-center border border-amber-500/20 shadow-inner">
                <Eye size={24} />
              </div>
              <h3 className="text-lg font-black tracking-tight text-slate-900 dark:text-white">Our Mission</h3>
              <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                To provide accessible, high-quality household electronics, energy supplies, and exceptional user support, enriching our customers’ everyday lives through verified, secure engineering innovations and timely local chat responsiveness.
              </p>
            </motion.div>
          </div>
        </div>
      </section>


      {/* 3. MEET THE TEAM / THE INNOVATORS */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-3 mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 font-bold text-xs uppercase tracking-wider font-mono">
            <Users size={14} />
            <span>Dedicated Personnel</span>
          </div>
          <h2 className={`text-2xl sm:text-3xl font-black tracking-tight ${
            darkMode ? 'text-white' : 'text-slate-900'
          }`}>
            Meet the Innovators
          </h2>
          <div className="w-16 h-1.5 bg-amber-500 mx-auto rounded-full" />
          <p className="text-sm max-w-md mx-auto opacity-70">
            Our specialized team managing inventory diagnostics, sales coordination, and distribution logistics in Liberia.
          </p>
        </div>

        {/* Team profiles grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {TEAM_MEMBERS.map((member, idx) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className={`rounded-2xl border overflow-hidden pb-5 text-center ${
                darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <div className="aspect-square bg-slate-50 dark:bg-slate-950/20 relative overflow-hidden group">
                <img 
                  src={member.avatar} 
                  alt={member.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
              </div>
              <div className="pt-4 px-4 space-y-1">
                <h4 className="font-extrabold text-sm">{member.name}</h4>
                <p className="text-amber-500 font-bold uppercase tracking-wider text-[10px] font-mono">
                  {member.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>


      {/* 4. CORE VALUES CARDS SECTION */}
      <section className={`py-20 ${
        darkMode ? 'bg-slate-900/20' : 'bg-slate-100/50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-3 mb-12">
            <h2 className={`text-2xl sm:text-3xl font-black tracking-tight ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}>
              Our Core Values
            </h2>
            <div className="w-16 h-1.5 bg-amber-500 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Shield size={22} />, title: "Integrity", desc: "We source and supply strictly 100% genuine products. No clones, no fake listings." },
              { icon: <Award size={22} />, title: "Quality Check", desc: "Before stock departure, each smartphone battery and plug converter passes diagnostics." },
              { icon: <CheckCircle size={22} />, title: "Innovation Support", desc: "Introducing advanced smart-life hubs, curved displays, and IoT fittings to Liberia." },
              { icon: <Users size={22} />, title: "Customer Focus", desc: "Continuously friendly, client-focused chat assistance. We coordinate delivery to your doorstep." }
            ].map((value, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-2xl border text-left space-y-3.5 ${
                  darkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <div className="p-2.5 bg-amber-500/10 text-amber-500 rounded-lg w-10 h-10 flex items-center justify-center border border-amber-500/20 shadow-inner">
                  {value.icon}
                </div>
                <h4 className="font-black text-sm uppercase tracking-wide text-slate-900 dark:text-white">
                  {value.title}
                </h4>
                <p className={`text-xs leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
