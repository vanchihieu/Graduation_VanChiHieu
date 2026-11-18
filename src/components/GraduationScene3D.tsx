import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface GraduationBackdrop3DProps {
  enabled?: boolean;
}

/**
 * Không gian WebGL 3D (Three.js) phối theo đúng màu Lễ Phục IUH 2026:
 * Đen Than (#181E29) + Xanh Cobalt (#2563EB) + Vàng Rực (#FACC15)
 */
export const GraduationBackdrop3D: React.FC<GraduationBackdrop3DProps> = ({ enabled = true }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      58,
      window.innerWidth / window.innerHeight,
      0.1,
      120
    );
    camera.position.set(0, 1.2, 14);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.55);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfef9c3, 2.0);
    sunLight.position.set(8, 14, 12);
    scene.add(sunLight);

    const cobaltRim = new THREE.DirectionalLight(0x60a5fa, 1.4);
    cobaltRim.position.set(-10, -4, 8);
    scene.add(cobaltRim);

    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.Material[] = [];

    // Sàn lưới 3D màu Xanh Cobalt
    const grid = new THREE.GridHelper(56, 36, 0x2563eb, 0x93c5fd);
    grid.position.y = -6.2;
    grid.position.z = -4;
    const gridMats = Array.isArray(grid.material) ? grid.material : [grid.material];
    gridMats.forEach((m) => {
      m.transparent = true;
      m.opacity = 0.28;
    });
    scene.add(grid);

    // Vật liệu theo màu trang phục IUH 2026: Vàng Rực + Xanh Cobalt + Đen Than
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xfacc15,
      metalness: 0.68,
      roughness: 0.2,
    });
    const cobaltMat = new THREE.MeshStandardMaterial({
      color: 0x2563eb,
      metalness: 0.4,
      roughness: 0.26,
    });
    const charcoalMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.45,
      roughness: 0.3,
    });
    const wireBlueMat = new THREE.MeshBasicMaterial({
      color: 0x2563eb,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    materials.push(goldMat, cobaltMat, charcoalMat, wireBlueMat);

    const floaters: Array<{
      mesh: THREE.Object3D;
      baseY: number;
      speed: number;
      rotX: number;
      rotY: number;
      phase: number;
    }> = [];

    const specs = [
      { type: 'torus', pos: [-9.0, 4.0, -2.5], scale: 1.25, mat: goldMat },
      { type: 'octa', pos: [9.2, 4.2, -2.0], scale: 1.15, mat: cobaltMat },
      { type: 'icosa', pos: [-9.6, -2.8, -1.5], scale: 1.15, mat: charcoalMat },
      { type: 'torus', pos: [9.5, -3.2, -3.0], scale: 1.1, mat: cobaltMat },
      { type: 'octa', pos: [-4.2, 5.2, -6.5], scale: 1.35, mat: goldMat },
      { type: 'icosa', pos: [4.6, -4.4, -6.0], scale: 1.25, mat: charcoalMat },
      { type: 'icosaWire', pos: [0, 0.8, -8.5], scale: 3.4, mat: wireBlueMat },
    ] as const;

    specs.forEach((s, idx) => {
      let geo: THREE.BufferGeometry;
      if (s.type === 'octa') {
        geo = new THREE.OctahedronGeometry(0.95, 0);
      } else if (s.type === 'torus') {
        geo = new THREE.TorusGeometry(0.95, 0.24, 18, 48);
      } else {
        geo = new THREE.IcosahedronGeometry(0.95, 0);
      }
      geometries.push(geo);

      const mesh = new THREE.Mesh(geo, s.mat);
      mesh.position.set(s.pos[0], s.pos[1], s.pos[2]);
      mesh.scale.setScalar(s.scale);
      scene.add(mesh);

      floaters.push({
        mesh,
        baseY: s.pos[1],
        speed: 0.65 + idx * 0.12,
        rotX: 0.004 + idx * 0.0008,
        rotY: 0.007 + idx * 0.001,
        phase: idx * 0.9,
      });
    });

    // 260 hạt ánh sáng 3D: Vàng Rực - Xanh Cobalt - Đen Than
    const particleCount = 260;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const palette = [
      new THREE.Color(0xfacc15),
      new THREE.Color(0xeab308),
      new THREE.Color(0x2563eb),
      new THREE.Color(0x38bdf8),
    ];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 32;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 18 - 2;

      const c = palette[i % palette.length];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometries.push(particleGeo);

    const particleMat = new THREE.PointsMaterial({
      size: 0.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });
    materials.push(particleMat);

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const onPointerMove = (e: PointerEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('resize', onResize);

    let rafId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      currentMouseX += (targetMouseX - currentMouseX) * 0.06;
      currentMouseY += (targetMouseY - currentMouseY) * 0.06;

      camera.position.x = currentMouseX * 1.6;
      camera.position.y = 1.2 - currentMouseY * 0.9;
      camera.lookAt(0, 0, -2);

      floaters.forEach((f) => {
        f.mesh.rotation.x += f.rotX;
        f.mesh.rotation.y += f.rotY;
        f.mesh.position.y = f.baseY + Math.sin(t * f.speed + f.phase) * 0.42;
      });

      particles.rotation.y = t * 0.04 + currentMouseX * 0.16;
      particles.rotation.x = currentMouseY * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', onResize);

      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      grid.geometry.dispose();
      gridMats.forEach((m) => m.dispose());
      renderer.dispose();

      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
};

interface InteractiveGradCap3DProps {
  className?: string;
}

/**
 * Mô hình Mũ & Dải Choàng Lễ Phục IUH 2026 3D chuẩn màu thực tế:
 * - Mũ Đen Than (#181E29) viền Xanh Cobalt (#3B82F6)
 * - Tua rua & Dải choàng Vàng Rực (#FACC15) + Điểm nhấn Xanh Cobalt (#2563EB)
 */
export const InteractiveGradCap3D: React.FC<InteractiveGradCap3DProps> = ({
  className = '',
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });
    } catch {
      return;
    }

    const width = container.clientWidth || 320;
    const height = container.clientHeight || 160;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 50);
    camera.position.set(0, 1.25, 5.2);
    camera.lookAt(0, 0.05, 0);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambient);

    const sunLight = new THREE.DirectionalLight(0xfef9c3, 2.2);
    sunLight.position.set(4, 6, 5);
    scene.add(sunLight);

    const cobaltFill = new THREE.DirectionalLight(0x60a5fa, 1.4);
    cobaltFill.position.set(-4, 1, -3);
    scene.add(cobaltFill);

    const capGroup = new THREE.Group();
    scene.add(capGroup);

    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.Material[] = [];

    const charcoalMat = new THREE.MeshStandardMaterial({
      color: 0x181e29,
      metalness: 0.25,
      roughness: 0.42,
    });
    const cobaltMat = new THREE.MeshStandardMaterial({
      color: 0x2563eb,
      metalness: 0.35,
      roughness: 0.3,
    });
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xfacc15,
      metalness: 0.72,
      roughness: 0.2,
    });
    materials.push(charcoalMat, cobaltMat, goldMat);

    // 1. Thân mũ Đen Than
    const skullGeo = new THREE.CylinderGeometry(0.84, 0.92, 0.62, 32);
    geometries.push(skullGeo);
    const skullMesh = new THREE.Mesh(skullGeo, charcoalMat);
    skullMesh.position.y = 0.05;
    capGroup.add(skullMesh);

    // 2. Vành dải choàng Vàng Rực phối sọc Xanh Cobalt IUH 2026
    const stoleGeo = new THREE.TorusGeometry(0.95, 0.11, 16, 48);
    geometries.push(stoleGeo);
    const stoleMesh = new THREE.Mesh(stoleGeo, goldMat);
    stoleMesh.rotation.x = Math.PI / 2;
    stoleMesh.position.y = -0.34;
    capGroup.add(stoleMesh);

    const trimGeo = new THREE.TorusGeometry(0.96, 0.035, 12, 48);
    geometries.push(trimGeo);
    const trimMesh = new THREE.Mesh(trimGeo, cobaltMat);
    trimMesh.rotation.x = Math.PI / 2;
    trimMesh.position.y = -0.24;
    capGroup.add(trimMesh);

    // 3. Chóp vuông Đen Than viền Xanh Cobalt
    const boardGeo = new THREE.BoxGeometry(2.25, 0.09, 2.25);
    geometries.push(boardGeo);
    const boardMesh = new THREE.Mesh(boardGeo, charcoalMat);
    boardMesh.position.y = 0.42;
    boardMesh.rotation.y = Math.PI / 4;
    capGroup.add(boardMesh);

    const edgeGeo = new THREE.EdgesGeometry(boardGeo);
    geometries.push(edgeGeo);
    const edgeMat = new THREE.LineBasicMaterial({ color: 0x60a5fa });
    materials.push(edgeMat);
    boardMesh.add(new THREE.LineSegments(edgeGeo, edgeMat));

    // 4. Nút & Tua rua Vàng Rực
    const buttonGeo = new THREE.SphereGeometry(0.11, 20, 20);
    geometries.push(buttonGeo);
    const buttonMesh = new THREE.Mesh(buttonGeo, goldMat);
    buttonMesh.position.y = 0.5;
    capGroup.add(buttonMesh);

    const tasselPivot = new THREE.Group();
    tasselPivot.position.set(0, 0.5, 0);
    capGroup.add(tasselPivot);

    const cordGeo = new THREE.CylinderGeometry(0.02, 0.02, 1.15, 10);
    geometries.push(cordGeo);
    const cordMesh = new THREE.Mesh(cordGeo, goldMat);
    cordMesh.rotation.z = Math.PI / 2;
    cordMesh.position.x = 0.56;
    tasselPivot.add(cordMesh);

    const dropGeo = new THREE.CylinderGeometry(0.022, 0.022, 0.52, 10);
    geometries.push(dropGeo);
    const dropMesh = new THREE.Mesh(dropGeo, goldMat);
    dropMesh.position.set(1.13, -0.26, 0);
    tasselPivot.add(dropMesh);

    const tasselConeGeo = new THREE.ConeGeometry(0.11, 0.3, 16);
    geometries.push(tasselConeGeo);
    const tasselCone = new THREE.Mesh(tasselConeGeo, goldMat);
    tasselCone.position.set(1.13, -0.58, 0);
    tasselPivot.add(tasselCone);

    // 5. Vòng hào quang Xanh Cobalt quay quanh mũ
    const orbitGeo = new THREE.TorusGeometry(1.78, 0.026, 12, 64);
    geometries.push(orbitGeo);
    const orbitRing = new THREE.Mesh(orbitGeo, cobaltMat);
    orbitRing.rotation.x = Math.PI / 2.35;
    orbitRing.rotation.y = 0.22;
    scene.add(orbitRing);

    let isDragging = false;
    let prevX = 0;
    let prevY = 0;
    let velX = 0;
    let velY = 0;

    const dom = renderer.domElement;
    dom.style.touchAction = 'none';

    const onDown = (e: PointerEvent) => {
      isDragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
      dom.setPointerCapture(e.pointerId);
    };

    const onMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      prevX = e.clientX;
      prevY = e.clientY;

      velY = dx * 0.012;
      velX = dy * 0.01;
      capGroup.rotation.y += velY;
      capGroup.rotation.x = Math.max(-0.55, Math.min(0.65, capGroup.rotation.x + velX));
    };

    const onUp = (e: PointerEvent) => {
      isDragging = false;
      if (dom.hasPointerCapture(e.pointerId)) {
        dom.releasePointerCapture(e.pointerId);
      }
    };

    dom.addEventListener('pointerdown', onDown);
    dom.addEventListener('pointermove', onMove);
    dom.addEventListener('pointerup', onUp);
    dom.addEventListener('pointercancel', onUp);

    const handleResize = () => {
      const w = container.clientWidth || 320;
      const h = container.clientHeight || 160;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    let rafId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      if (!isDragging) {
        capGroup.rotation.y += 0.008 + velY * 0.92;
        capGroup.rotation.x += (0.12 - capGroup.rotation.x) * 0.03;
        velY *= 0.92;
        velX *= 0.92;
      }

      capGroup.position.y = Math.sin(t * 2) * 0.07;
      tasselPivot.rotation.z = Math.sin(t * 2.6) * 0.06;
      orbitRing.rotation.z = t * 0.45;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      dom.removeEventListener('pointerdown', onDown);
      dom.removeEventListener('pointermove', onMove);
      dom.removeEventListener('pointerup', onUp);
      dom.removeEventListener('pointercancel', onUp);

      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      renderer.dispose();

      if (dom.parentNode === container) {
        container.removeChild(dom);
      }
    };
  }, []);

  return <div ref={mountRef} className={`cursor-grab active:cursor-grabbing ${className}`} />;
};
