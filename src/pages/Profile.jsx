import React from 'react';
import { User, Settings, CreditCard, MapPin, Bell, Shield, LogOut, ChevronRight, Gift } from 'lucide-react';
import { useOrderStore } from '../store/useOrderStore';

export const Profile = () => {
  const deliveryAddress = useOrderStore((state) => state.deliveryAddress);

  const menuItems = [
    { icon: User, label: 'Personal Information', color: 'bg-blue-50 text-blue-600' },
    { icon: CreditCard, label: 'Payment Methods', color: 'bg-purple-50 text-purple-600' },
    { icon: MapPin, label: 'Saved Addresses', color: 'bg-orange-50 text-orange-600', sub: `${deliveryAddress.street}, ${deliveryAddress.city}` },
    { icon: Bell, label: 'Notifications', color: 'bg-pink-50 text-pink-600' },
    { icon: Shield, label: 'Security & Privacy', color: 'bg-emerald-50 text-emerald-600' },
  ];

  return (
    <div className="px-5 pt-6 pb-20">
      <header className="flex items-center gap-4 mb-8">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white shadow-xl shadow-orange-100 ring-4 ring-orange-50">
          <User size={40} />
        </div>
        <div>
          <h1 className="text-[24px] font-extrabold tracking-tight">Alex Johnson</h1>
          <p className="text-[var(--text-muted)] text-[14px] font-medium">alex.j@example.com</p>
          <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--accent-light)] text-[var(--accent-dark)] rounded-full text-[11px] font-extrabold uppercase tracking-wider">
            <Gift size={12} />
            <span>Gold Member</span>
          </div>
        </div>
      </header>

      <div className="space-y-6">
        <section>
          <h3 className="text-[12px] font-extrabold text-[var(--text-muted)] uppercase tracking-[0.15em] mb-4 ml-1">Account Settings</h3>
          <div className="bg-white border border-[var(--border)] rounded-[32px] overflow-hidden">
            {menuItems.map((item, index) => (
              <button
                key={index}
                className={`w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors ${
                  index !== menuItems.length - 1 ? 'border-b border-[var(--border)]' : ''
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-11 h-11 rounded-2xl ${item.color} flex items-center justify-center`}>
                    <item.icon size={22} />
                  </div>
                  <div className="text-left">
                    <p className="text-[15px] font-extrabold text-[var(--text-primary)]">{item.label}</p>
                    {item.sub && <p className="text-[12px] font-bold text-[var(--text-dim)] mt-0.5">{item.sub}</p>}
                  </div>
                </div>
                <ChevronRight size={18} className="text-[var(--text-dim)]" />
              </button>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-[12px] font-extrabold text-[var(--text-muted)] uppercase tracking-[0.15em] mb-4 ml-1">More</h3>
          <div className="bg-white border border-[var(--border)] rounded-[32px] overflow-hidden">
            <button className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors border-b border-[var(--border)]">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-2xl bg-gray-50 text-gray-600 flex items-center justify-center">
                  <Settings size={22} />
                </div>
                <p className="text-[15px] font-extrabold text-[var(--text-primary)]">Settings</p>
              </div>
              <ChevronRight size={18} className="text-[var(--text-dim)]" />
            </button>
            <button className="w-full flex items-center justify-between p-5 hover:bg-red-50 transition-colors group">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center group-hover:bg-red-100 transition-colors">
                  <LogOut size={22} />
                </div>
                <p className="text-[15px] font-extrabold text-red-500">Log Out</p>
              </div>
            </button>
          </div>
        </section>

        <div className="text-center py-4">
          <p className="text-[11px] font-extrabold text-[var(--text-dim)] uppercase tracking-widest">Crumb v1.0.42</p>
        </div>
      </div>
    </div>
  );
};
