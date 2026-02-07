import type { Metadata } from "next";

import { getI18n } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, t } = await getI18n();
  const isZh = locale === "zh";
  return {
    title: `${t.auth.privacyPolicy} - LionSaid`,
    description: isZh ? "LionSaid 平台隐私政策" : "Privacy Policy for LionSaid platform",
  };
}

function PrivacyContentEn() {
  return (
    <>
      <section>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">1. Introduction</h2>
        <p>
          LionSaid ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how
          we collect, use, disclose, and safeguard your information when you use our Service. Please read this
          Privacy Policy carefully.
        </p>
        <p className="mt-4">
          BY USING THE SERVICE, YOU AGREE TO THE COLLECTION AND USE OF INFORMATION IN ACCORDANCE WITH THIS POLICY.
          If you do not agree with the terms of this Privacy Policy, please do not access the Service.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">2. Information We Collect</h2>

        <h3 className="mb-3 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">2.1 Information You Provide</h3>
        <p>We collect information that you voluntarily provide to us, including:</p>
        <ul className="mt-4 list-disc space-y-2 pl-6">
          <li>Account registration information (name, email address, username, password)</li>
          <li>Profile information (profile picture, bio, preferences)</li>
          <li>Content you submit (posts, comments, messages)</li>
          <li>Payment information (processed securely through third-party payment processors)</li>
          <li>Communications with us (support requests, feedback)</li>
        </ul>

        <h3 className="mb-3 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">2.2 Automatically Collected Information</h3>
        <p>When you access the Service, we automatically collect certain information, including:</p>
        <ul className="mt-4 list-disc space-y-2 pl-6">
          <li>Device information (IP address, browser type, operating system)</li>
          <li>Usage data (pages visited, time spent, features used)</li>
          <li>Log data (access times, error logs)</li>
          <li>Cookies and similar tracking technologies</li>
        </ul>

        <h3 className="mb-3 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">2.3 Information from Third Parties</h3>
        <p>We may receive information about you from third parties, such as:</p>
        <ul className="mt-4 list-disc space-y-2 pl-6">
          <li>Social media platforms (if you connect your account)</li>
          <li>Analytics providers</li>
          <li>Marketing partners</li>
        </ul>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">3. How We Use Your Information</h2>
        <p>We use the collected information for the following purposes:</p>
        <ul className="mt-4 list-disc space-y-2 pl-6">
          <li>To provide, maintain, and improve the Service</li>
          <li>To process transactions and send related information</li>
          <li>To send administrative information, updates, and security alerts</li>
          <li>To respond to your comments, questions, and customer service requests</li>
          <li>To monitor and analyze usage trends and preferences</li>
          <li>To detect, prevent, and address technical issues and security threats</li>
          <li>To personalize your experience and deliver targeted content</li>
          <li>To send marketing communications (with your consent)</li>
          <li>To comply with legal obligations</li>
        </ul>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">4. How We Share Your Information</h2>
        <p>We may share your information in the following circumstances:</p>

        <h3 className="mb-3 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">4.1 Service Providers</h3>
        <p>
          We may share your information with third-party service providers who perform services on our behalf,
          such as hosting, data analysis, payment processing, and customer service.
        </p>

        <h3 className="mb-3 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">4.2 Business Transfers</h3>
        <p>
          If we are involved in a merger, acquisition, or sale of assets, your information may be transferred
          as part of that transaction. We will provide notice before your information is transferred.
        </p>

        <h3 className="mb-3 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">4.3 Legal Requirements</h3>
        <p>
          We may disclose your information if required to do so by law or in response to valid requests by
          public authorities (e.g., court orders, subpoenas).
        </p>

        <h3 className="mb-3 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">4.4 Protection of Rights</h3>
        <p>
          We may disclose your information when we believe it is necessary to protect our rights, protect your
          safety or the safety of others, investigate fraud, or respond to a government request.
        </p>

        <h3 className="mb-3 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">4.5 With Your Consent</h3>
        <p>We may share your information with third parties when you have given us explicit consent to do so.</p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">5. Data Retention</h2>
        <p>
          We retain your information for as long as necessary to fulfill the purposes outlined in this Privacy
          Policy, unless a longer retention period is required or permitted by law. When we no longer need your
          information, we will securely delete or anonymize it.
        </p>
        <p className="mt-4">
          Even after account deletion, we may retain certain information as required by law, for legitimate
          business purposes, or to protect our legal rights.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">6. Data Security</h2>
        <p>
          We implement appropriate technical and organizational security measures to protect your information
          against unauthorized access, alteration, disclosure, or destruction. These measures include:
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-6">
          <li>Encryption of data in transit and at rest</li>
          <li>Regular security assessments and audits</li>
          <li>Access controls and authentication mechanisms</li>
          <li>Employee training on data protection</li>
        </ul>
        <p className="mt-4">
          However, no method of transmission over the Internet or electronic storage is 100% secure. While we
          strive to use commercially acceptable means to protect your information, we cannot guarantee its
          absolute security.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">7. Your Privacy Rights</h2>
        <p>Depending on your location, you may have the following rights regarding your personal information:</p>
        <ul className="mt-4 list-disc space-y-2 pl-6">
          <li>
            <strong>Access:</strong> Request access to your personal information
          </li>
          <li>
            <strong>Correction:</strong> Request correction of inaccurate or incomplete information
          </li>
          <li>
            <strong>Deletion:</strong> Request deletion of your personal information
          </li>
          <li>
            <strong>Portability:</strong> Request a copy of your information in a portable format
          </li>
          <li>
            <strong>Objection:</strong> Object to processing of your information
          </li>
          <li>
            <strong>Restriction:</strong> Request restriction of processing
          </li>
          <li>
            <strong>Withdraw Consent:</strong> Withdraw consent for processing (where applicable)
          </li>
        </ul>
        <p className="mt-4">
          To exercise these rights, please contact us at privacy@lionsaid.com. We will respond to your request
          within a reasonable timeframe and in accordance with applicable law.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">8. Cookies and Tracking Technologies</h2>
        <p>
          We use cookies and similar tracking technologies to track activity on our Service and store certain
          information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being
          sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
        </p>
        <p className="mt-4">Types of cookies we use:</p>
        <ul className="mt-4 list-disc space-y-2 pl-6">
          <li>
            <strong>Essential Cookies:</strong> Required for the Service to function properly
          </li>
          <li>
            <strong>Analytics Cookies:</strong> Help us understand how users interact with the Service
          </li>
          <li>
            <strong>Preference Cookies:</strong> Remember your settings and preferences
          </li>
          <li>
            <strong>Marketing Cookies:</strong> Used to deliver relevant advertisements
          </li>
        </ul>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">9. Third-Party Links</h2>
        <p>
          Our Service may contain links to third-party websites or services that are not operated by us. We have
          no control over and assume no responsibility for the content, privacy policies, or practices of any
          third-party sites or services. We strongly advise you to review the privacy policy of every site you visit.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">10. Children&apos;s Privacy</h2>
        <p>
          Our Service is not intended for children under the age of 13 (or the applicable age of consent in your
          jurisdiction). We do not knowingly collect personal information from children. If you are a parent or
          guardian and believe your child has provided us with personal information, please contact us immediately.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">11. International Data Transfers</h2>
        <p>
          Your information may be transferred to and maintained on computers located outside of your state,
          province, country, or other governmental jurisdiction where data protection laws may differ. By using
          the Service, you consent to the transfer of your information to our facilities and to the third parties
          with whom we share it as described in this Privacy Policy.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">12. California Privacy Rights</h2>
        <p>
          If you are a California resident, you have specific rights under the California Consumer Privacy Act
          (CCPA), including:
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-6">
          <li>The right to know what personal information is collected, used, shared, or sold</li>
          <li>The right to delete personal information</li>
          <li>The right to opt-out of the sale of personal information</li>
          <li>The right to non-discrimination for exercising your privacy rights</li>
        </ul>
        <p className="mt-4">Note: We do not sell your personal information to third parties.</p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">13. GDPR Compliance (European Users)</h2>
        <p>
          If you are located in the European Economic Area (EEA), you have certain data protection rights under
          the General Data Protection Regulation (GDPR). We process your personal information based on the
          following legal grounds:
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-6">
          <li>Your consent</li>
          <li>Performance of a contract with you</li>
          <li>Compliance with legal obligations</li>
          <li>Our legitimate interests</li>
        </ul>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">14. Changes to This Privacy Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the
          new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this
          Privacy Policy periodically for any changes.
        </p>
        <p className="mt-4">
          Your continued use of the Service after we post any modifications to the Privacy Policy will constitute
          your acknowledgment of the modifications and your consent to abide by the modified Privacy Policy.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">15. Contact Us</h2>
        <p>If you have any questions about this Privacy Policy or our privacy practices, please contact us at:</p>
        <p className="mt-4">
          Email: privacy@lionsaid.com
          <br />
          Address: [Your Company Address]
          <br />
          Data Protection Officer: dpo@lionsaid.com
        </p>
      </section>
    </>
  );
}

function PrivacyContentZh() {
  return (
    <>
      <section>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">1. 引言</h2>
        <p>
          LionSaid（“我们”）重视并保护您的隐私。本《隐私政策》说明您使用我们的服务时，
          我们如何收集、使用、披露与保护您的信息。请仔细阅读本政策。
        </p>
        <p className="mt-4">
          使用本服务即表示您同意我们按照本政策收集和使用您的信息。
          如您不同意本《隐私政策》，请勿访问或使用本服务。
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">2. 我们收集的信息</h2>

        <h3 className="mb-3 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">2.1 您提供的信息</h3>
        <p>我们收集您自愿提供给我们的信息，包括：</p>
        <ul className="mt-4 list-disc space-y-2 pl-6">
          <li>账户注册信息（姓名、邮箱、用户名、密码）</li>
          <li>个人资料信息（头像、简介、偏好设置）</li>
          <li>您提交的内容（帖子、评论、消息）</li>
          <li>支付信息（通过第三方支付机构安全处理）</li>
          <li>与我们的沟通记录（支持请求、反馈）</li>
        </ul>

        <h3 className="mb-3 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">2.2 自动收集的信息</h3>
        <p>当您访问服务时，我们会自动收集某些信息，包括：</p>
        <ul className="mt-4 list-disc space-y-2 pl-6">
          <li>设备信息（IP 地址、浏览器类型、操作系统）</li>
          <li>使用数据（访问页面、停留时间、使用功能）</li>
          <li>日志数据（访问时间、错误日志）</li>
          <li>Cookies 与类似跟踪技术</li>
        </ul>

        <h3 className="mb-3 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">2.3 来自第三方的信息</h3>
        <p>我们可能从第三方接收有关您的信息，例如：</p>
        <ul className="mt-4 list-disc space-y-2 pl-6">
          <li>社交媒体平台（如您关联账号）</li>
          <li>分析服务提供商</li>
          <li>营销合作伙伴</li>
        </ul>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">3. 我们如何使用您的信息</h2>
        <p>我们将收集的信息用于以下目的：</p>
        <ul className="mt-4 list-disc space-y-2 pl-6">
          <li>提供、维护并改进服务</li>
          <li>处理交易并发送相关信息</li>
          <li>发送管理信息、更新与安全提醒</li>
          <li>回应您的评论、问题与客户服务请求</li>
          <li>监测与分析使用趋势与偏好</li>
          <li>检测、预防并解决技术问题与安全威胁</li>
          <li>个性化您的体验并提供定向内容</li>
          <li>在获得同意的情况下发送营销信息</li>
          <li>遵守法律义务</li>
        </ul>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">4. 我们如何共享您的信息</h2>
        <p>在以下情况下，我们可能会共享您的信息：</p>

        <h3 className="mb-3 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">4.1 服务提供商</h3>
        <p>
          我们可能与代表我们提供服务的第三方服务提供商共享信息，
          例如托管、数据分析、支付处理与客户服务。
        </p>

        <h3 className="mb-3 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">4.2 业务转移</h3>
        <p>
          如果我们发生合并、收购或资产出售，您的信息可能作为交易的一部分被转移。
          我们将在信息转移前提供通知。
        </p>

        <h3 className="mb-3 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">4.3 法律要求</h3>
        <p>
          若法律要求或应公共机构合法请求（如法院命令、传票），我们可能披露您的信息。
        </p>

        <h3 className="mb-3 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">4.4 权利保护</h3>
        <p>
          当我们认为有必要保护我们的权利、您或他人的安全、调查欺诈或回应政府请求时，
          我们可能披露您的信息。
        </p>

        <h3 className="mb-3 mt-6 text-xl font-semibold text-gray-800 dark:text-gray-200">4.5 经您同意</h3>
        <p>在您明确同意的情况下，我们可能与第三方共享您的信息。</p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">5. 数据保留</h2>
        <p>
          我们会在实现本隐私政策所述目的所需的期限内保留您的信息，除非法律要求或允许更长的保留期限。
          当我们不再需要您的信息时，我们将安全删除或匿名化处理。
        </p>
        <p className="mt-4">
          即使账户删除后，我们仍可能基于法律要求、合法商业目的或保护法律权利而保留部分信息。
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">6. 数据安全</h2>
        <p>
          我们采取适当的技术与组织安全措施以保护您的信息免受未经授权的访问、篡改、披露或破坏。
          这些措施包括：
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-6">
          <li>传输与存储中的数据加密</li>
          <li>定期安全评估与审计</li>
          <li>访问控制与身份验证机制</li>
          <li>员工数据保护培训</li>
        </ul>
        <p className="mt-4">
          但需注意，互联网传输或电子存储方式并非百分之百安全。虽然我们努力采用商业上可接受的方式保护您的信息，
          但无法保证其绝对安全。
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">7. 您的隐私权利</h2>
        <p>根据您所在地区，您可能拥有以下与个人信息相关的权利：</p>
        <ul className="mt-4 list-disc space-y-2 pl-6">
          <li>
            <strong>访问权：</strong>请求访问您的个人信息
          </li>
          <li>
            <strong>更正权：</strong>请求更正不准确或不完整的信息
          </li>
          <li>
            <strong>删除权：</strong>请求删除您的个人信息
          </li>
          <li>
            <strong>可携带权：</strong>请求以可携带格式获得您的信息副本
          </li>
          <li>
            <strong>反对权：</strong>反对处理您的信息
          </li>
          <li>
            <strong>限制权：</strong>请求限制处理
          </li>
          <li>
            <strong>撤回同意：</strong>在适用时撤回处理同意
          </li>
        </ul>
        <p className="mt-4">
          如需行使上述权利，请联系 privacy@lionsaid.com。我们将根据适用法律在合理时间内回应您的请求。
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">8. Cookies 与跟踪技术</h2>
        <p>
          我们使用 Cookies 与类似跟踪技术来跟踪服务中的活动并存储某些信息。
          您可以设置浏览器拒绝所有 Cookies 或在发送 Cookies 时提示您。
          但若您不接受 Cookies，可能无法使用服务的部分功能。
        </p>
        <p className="mt-4">我们使用的 Cookies 类型包括：</p>
        <ul className="mt-4 list-disc space-y-2 pl-6">
          <li>
            <strong>必要 Cookies：</strong>服务正常运行所必需
          </li>
          <li>
            <strong>分析 Cookies：</strong>帮助我们了解用户如何使用服务
          </li>
          <li>
            <strong>偏好 Cookies：</strong>记住您的设置与偏好
          </li>
          <li>
            <strong>营销 Cookies：</strong>用于投放相关广告
          </li>
        </ul>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">9. 第三方链接</h2>
        <p>
          我们的服务可能包含指向第三方网站或服务的链接，这些网站或服务不由我们运营。
          我们无法控制且不对任何第三方网站或服务的内容、隐私政策或实践负责。
          我们强烈建议您阅读您访问的每个网站的隐私政策。
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">10. 儿童隐私</h2>
        <p>
          我们的服务不面向 13 岁以下儿童（或您所在司法辖区的法定同意年龄以下的未成年人）。
          我们不会有意收集儿童的个人信息。若您是家长或监护人并认为您的孩子向我们提供了个人信息，
          请立即联系我们。
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">11. 跨境数据传输</h2>
        <p>
          您的信息可能被传输至并存储在您所在州、省、国家或其他司法辖区之外的计算机上，
          这些地区的数据保护法律可能与您所在地区不同。
          使用本服务即表示您同意将您的信息转移至我们的设施以及我们在本政策中所述共享的第三方。
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">12. 加州隐私权</h2>
        <p>
          如果您是加州居民，您享有《加州消费者隐私法》（CCPA）项下的特定权利，包括：
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-6">
          <li>知悉收集、使用、共享或出售的个人信息内容的权利</li>
          <li>删除个人信息的权利</li>
          <li>选择不出售个人信息的权利</li>
          <li>行使隐私权利不受歧视的权利</li>
        </ul>
        <p className="mt-4">说明：我们不会向第三方出售您的个人信息。</p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">13. GDPR 合规（欧洲用户）</h2>
        <p>
          如果您位于欧洲经济区（EEA），您享有《通用数据保护条例》（GDPR）项下的特定权利。
          我们基于以下法律依据处理您的个人信息：
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-6">
          <li>您的同意</li>
          <li>履行与您的合同</li>
          <li>遵守法律义务</li>
          <li>我们的合法利益</li>
        </ul>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">14. 隐私政策变更</h2>
        <p>
          我们可能不时更新本隐私政策。若有变更，我们将在本页面发布新的隐私政策并更新“最后更新”日期。
          建议您定期查看本隐私政策以了解任何变化。
        </p>
        <p className="mt-4">
          在我们发布隐私政策修改后，您继续使用服务即表示您确认修改并同意遵守更新后的隐私政策。
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">15. 联系我们</h2>
        <p>如对本隐私政策或我们的隐私实践有任何疑问，请联系：</p>
        <p className="mt-4">
          邮箱：privacy@lionsaid.com
          <br />
          地址：[您的公司地址]
          <br />
          数据保护负责人：dpo@lionsaid.com
        </p>
      </section>
    </>
  );
}

export default async function PrivacyPage() {
  const { locale } = await getI18n();
  const isZh = locale === "zh";
  const dateLocale = isZh ? "zh-CN" : "en-US";
  const updated = new Date().toLocaleDateString(dateLocale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <section className="relative">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          <div className="pb-12 text-center md:pb-20">
            <h1 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.900),theme(colors.indigo.700),theme(colors.gray.800),theme(colors.indigo.600),theme(colors.gray.900))] bg-[length:200%_auto] bg-clip-text pb-5 font-nacelle text-4xl font-semibold text-transparent dark:bg-[linear-gradient(to_right,theme(colors.gray.200),theme(colors.indigo.200),theme(colors.gray.50),theme(colors.indigo.300),theme(colors.gray.200))] md:text-5xl">
              {isZh ? "隐私政策" : "Privacy Policy"}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {isZh ? `最后更新：${updated}` : `Last Updated: ${updated}`}
            </p>
          </div>

          <div className="prose prose-invert mx-auto max-w-4xl">
            <div className="space-y-8 text-gray-800 dark:text-gray-100">
              {isZh ? <PrivacyContentZh /> : <PrivacyContentEn />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
