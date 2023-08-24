import{_ as a,o as e,c as r,N as t}from"./chunks/framework.6fe2e870.js";const b=JSON.parse('{"title":"TypeScript 内置的高级类型","description":"","frontmatter":{},"headers":[],"relativePath":"src/types/高级类型.md","lastUpdated":1692880113000}'),i={name:"src/types/高级类型.md"},o=t('<h1 id="typescript-内置的高级类型" tabindex="-1">TypeScript 内置的高级类型 <a class="header-anchor" href="#typescript-内置的高级类型" aria-label="Permalink to &quot;TypeScript 内置的高级类型&quot;">​</a></h1><h2 id="parameters" tabindex="-1">Parameters <a class="header-anchor" href="#parameters" aria-label="Permalink to &quot;Parameters&quot;">​</a></h2><p>Parameters 用于提取函数类型的参数类型。</p><h2 id="returntype" tabindex="-1">ReturnType <a class="header-anchor" href="#returntype" aria-label="Permalink to &quot;ReturnType&quot;">​</a></h2><p>ReturnType 用于提取函数类型的返回值类型。</p><h2 id="constructorparameters" tabindex="-1">ConstructorParameters <a class="header-anchor" href="#constructorparameters" aria-label="Permalink to &quot;ConstructorParameters&quot;">​</a></h2><p>构造器类型和函数类型的区别就是可以被 new。</p><p>Parameters 用于提取函数参数的类型，而 ConstructorParameters 用于提取构造器参数的类型。</p><h2 id="instancetype" tabindex="-1">InstanceType <a class="header-anchor" href="#instancetype" aria-label="Permalink to &quot;InstanceType&quot;">​</a></h2><p>提取了构造器参数的类型，自然也可以提取构造器返回值的类型，就是 InstanceType。</p><h2 id="thisparametertype" tabindex="-1">ThisParameterType <a class="header-anchor" href="#thisparametertype" aria-label="Permalink to &quot;ThisParameterType&quot;">​</a></h2><h2 id="omitthisparameter" tabindex="-1">OmitThisParameter <a class="header-anchor" href="#omitthisparameter" aria-label="Permalink to &quot;OmitThisParameter&quot;">​</a></h2><h2 id="partial" tabindex="-1">Partial <a class="header-anchor" href="#partial" aria-label="Permalink to &quot;Partial&quot;">​</a></h2><h2 id="required" tabindex="-1">Required <a class="header-anchor" href="#required" aria-label="Permalink to &quot;Required&quot;">​</a></h2><h2 id="readonly" tabindex="-1">Readonly <a class="header-anchor" href="#readonly" aria-label="Permalink to &quot;Readonly&quot;">​</a></h2><h2 id="pick" tabindex="-1">Pick <a class="header-anchor" href="#pick" aria-label="Permalink to &quot;Pick&quot;">​</a></h2><h2 id="record" tabindex="-1">Record <a class="header-anchor" href="#record" aria-label="Permalink to &quot;Record&quot;">​</a></h2><h2 id="exclude" tabindex="-1">Exclude <a class="header-anchor" href="#exclude" aria-label="Permalink to &quot;Exclude&quot;">​</a></h2><h2 id="extract" tabindex="-1">Extract <a class="header-anchor" href="#extract" aria-label="Permalink to &quot;Extract&quot;">​</a></h2><h2 id="omit" tabindex="-1">Omit <a class="header-anchor" href="#omit" aria-label="Permalink to &quot;Omit&quot;">​</a></h2><h2 id="awaited" tabindex="-1">Awaited <a class="header-anchor" href="#awaited" aria-label="Permalink to &quot;Awaited&quot;">​</a></h2><h2 id="nonnullable" tabindex="-1">NonNullable <a class="header-anchor" href="#nonnullable" aria-label="Permalink to &quot;NonNullable&quot;">​</a></h2><h2 id="uppercase" tabindex="-1">Uppercase <a class="header-anchor" href="#uppercase" aria-label="Permalink to &quot;Uppercase&quot;">​</a></h2><h2 id="lowercase" tabindex="-1">Lowercase <a class="header-anchor" href="#lowercase" aria-label="Permalink to &quot;Lowercase&quot;">​</a></h2><h2 id="capitalize" tabindex="-1">Capitalize <a class="header-anchor" href="#capitalize" aria-label="Permalink to &quot;Capitalize&quot;">​</a></h2><h2 id="uncapitalize" tabindex="-1">Uncapitalize <a class="header-anchor" href="#uncapitalize" aria-label="Permalink to &quot;Uncapitalize&quot;">​</a></h2><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>比如用模式匹配可以实现：Parameters、ReturnType、ConstructorParameters、InstanceType、ThisParameterType。</p><p>用模式匹配 + 重新构造可以实现：OmitThisParameter</p><p>用重新构造可以实现：Partial、Required、Readonly、Pick、Record</p><p>用模式匹配 + 递归可以实现： Awaited</p><p>用联合类型在分布式条件类型的特性可以实现： Exclude</p><p>此外还有 NonNullable 和四个编译器内部实现的类型：Uppercase、Lowercase、Capitalize、Uncapitalize。</p>',33),l=[o];function n(h,c,s,d,p,u){return e(),r("div",null,l)}const q=a(i,[["render",n]]);export{b as __pageData,q as default};
