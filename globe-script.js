/**
 * globe-script.js
 * 地球组件初始化脚本
 * 用于在 index.html 中嵌入 Gio.js 地球可视化
 */

(function() {
    'use strict';
    
    /**
     * 初始化地球组件
     */
    function initGlobeSection() {
        // 检查容器是否存在
        const container = document.getElementById('embeddedGlobe');
        if (!container) {
            console.warn('Globe container not found. Skipping globe initialization.');
            return;
        }
        
        // 检查必要的库是否加载
        if (typeof THREE === 'undefined') {
            console.error('Three.js not loaded');
            return;
        }
        
        if (typeof GIO === 'undefined') {
            console.error('Gio.js not loaded');
            return;
        }
        
        try {
            // 创建 Gio 控制器
            const controller = new GIO.Controller(container, {
                control: {
                    initCountry: 'CN',      // 初始国家设置为中国
                    autoRotation: true,     // 自动旋转
                    autoRotationSpeed: 0.5  // 旋转速度
                },
                color: {
                    surface: 0x0a1a2a,    // 深蓝色表面
                    selected: null,        // 选中国家颜色
                    in: 0xff6b6b,          // 流入数据红色
                    out: 0x4ecdc4,         // 流出数据青色
                    halo: 0x5588ff,        // 光晕蓝色
                    background: 0x000000   // 黑色背景
                },
                brightness: {
                    ocean: 0.5,     // 海洋亮度
                    mentioned: 0.5, // 提及国家亮度
                    related: 0.5    // 相关国家亮度
                },
                halo: true // 启用光晕效果
            });
            
            // 添加示例数据 - 展示全球主要数据流动
            const sampleData = [
                // 中国向外的数据流
                { "e": "CN", "i": "US", "v": 2500000 },  // 中国到美国
                { "e": "CN", "i": "JP", "v": 2000000 },  // 中国到日本
                { "e": "CN", "i": "KR", "v": 1500000 },  // 中国到韩国
                { "e": "CN", "i": "DE", "v": 1200000 },  // 中国到德国
                { "e": "CN", "i": "GB", "v": 1000000 },  // 中国到英国
                { "e": "CN", "i": "AU", "v": 900000 },   // 中国到澳大利亚
                { "e": "CN", "i": "SG", "v": 800000 },   // 中国到新加坡
                { "e": "CN", "i": "IN", "v": 700000 },   // 中国到印度
                
                // 其他国家向中国的数据流
                { "e": "US", "i": "CN", "v": 2300000 },  // 美国到中国
                { "e": "JP", "i": "CN", "v": 1800000 },  // 日本到中国
                { "e": "KR", "i": "CN", "v": 1400000 },  // 韩国到中国
                
                // 其他国家之间的数据流
                { "e": "US", "i": "GB", "v": 1200000 },  // 美国到英国
                { "e": "US", "i": "JP", "v": 1100000 },  // 美国到日本
                { "e": "GB", "i": "FR", "v": 900000 },   // 英国到法国
                { "e": "DE", "i": "FR", "v": 850000 },   // 德国到法国
                { "e": "JP", "i": "KR", "v": 800000 }    // 日本到韩国
            ];
            
            // 加载数据到地球
            controller.addData(sampleData);
            
            // 初始化并渲染地球
            controller.init();
            
            console.log('Embedded globe initialized successfully');
        } catch (error) {
            console.error('Error initializing globe:', error);
        }
    }
    
    // 等待 DOM 加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initGlobeSection);
    } else {
        // DOM 已经加载完成
        initGlobeSection();
    }
})();
