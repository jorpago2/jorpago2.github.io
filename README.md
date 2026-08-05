# jorpago2.github.io

Dashboard público de software científico de Jorge Parra: simulación electromagnética, fotónica integrada y automatización experimental.

## Desarrollo local

```powershell
pnpm install
pnpm dev
```

La exportación estática para GitHub Pages se genera con:

```powershell
pnpm build
```

Los proyectos del dashboard se mantienen en `src/App.tsx`. La compilación genera
un sitio Vite prerenderizado en `dist/`, sin backend ni servicios externos.

## Contrato de interfaz

Las reglas comunes de navegación, accesibilidad, estados y responsive se documentan en [`docs/interface-contract.md`](docs/interface-contract.md).
