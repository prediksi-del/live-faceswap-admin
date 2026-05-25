import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Admin Rayan Kredensial',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Logika verifikasi kecocokan akun admin untuk gateway panel
        if (credentials?.username === "admin" && credentials?.password === "supersecretajm2026") {
          return { id: "1", name: "Super Admin", email: "admin@rayanxweb.com" };
        }
        return null;
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/admin', // Mengarahkan kembali ke panel jika sesi kosong
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = 'admin';
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
      }
      return session;
    }
  }
});
