import { LoginForm } from './LoginForm'

export default function AdminLoginPage() {
  return (
    <main className="min-h-screen bg-bg-primary flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-bg-surface border border-border rounded-2xl p-8 flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-semibold text-text-primary font-heading">
            🧊 Iceberg Admin
          </h1>
          <p className="text-sm text-text-secondary">Yönetim paneline giriş yapın</p>
        </div>
        <LoginForm />
      </div>
    </main>
  )
}
