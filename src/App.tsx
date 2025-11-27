import { useState, useEffect } from 'react';
import { StartScreen } from './components/StartScreen';
import { QuestionScreen } from './components/QuestionScreen';
import { ResultScreen } from './components/ResultScreen';
import { PaymentModal } from './components/PaymentModal';
import { PaymentMethodModal } from './components/PaymentMethodModal';
import { ActivationError } from './components/ActivationError';
import { ActivationService } from './services/activationService';
import { AgePreferenceResult } from './types';
import './App.css';

type Screen = 'start' | 'question' | 'result';

function App() {
  const [screen, setScreen] = useState<Screen>('start');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [result, setResult] = useState<AgePreferenceResult | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showMethodModal, setShowMethodModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{ plan: 'basic' | 'professional' | 'premium'; price: string } | null>(null);
  
  // 激活码验证状态
  const [isActivated, setIsActivated] = useState<boolean>(false);
  const [activationError, setActivationError] = useState<string | null>(null);
  const [activationCode, setActivationCode] = useState<string | null>(null);
  const [isValidating, setIsValidating] = useState<boolean>(true);

  const totalQuestions = 20;

  // 页面加载时验证激活码或检查测试模式
  useEffect(() => {
    // 检查是否是本地开发环境
    const isLocalhost = window.location.hostname === 'localhost' || 
                       window.location.hostname === '127.0.0.1' ||
                       window.location.hostname === '[::1]';
    
    // 只在本地环境允许测试模式
    if (isLocalhost) {
      const urlParams = new URLSearchParams(window.location.search);
      const isTestMode = urlParams.get('test') === 'true';
      const testScore = urlParams.get('score');
      
      if (isTestMode && testScore) {
        // 测试模式：直接显示结果
        const score = parseInt(testScore, 10);
        if (score >= 0 && score <= 100) {
          const testResult = calculateAgePreference(score * 2 - 40); // 转换为-40到40的分数
          setResult(testResult);
          setScreen('result');
          setIsActivated(true);
          setIsValidating(false);
          return;
        }
      }
    }
    
    validateActivation();
  }, []);

  const validateActivation = async () => {
    setIsValidating(true);

    // 0. 开发环境检测 - 跳过激活码验证
    if (ActivationService.isDevelopmentMode()) {
      console.log('🔧 Development mode detected - skipping activation');
      setIsActivated(true);
      setActivationCode('DEV-MODE');
      setIsValidating(false);
      return;
    }

    // 1. 先检查本地存储的激活码
    const savedActivation = ActivationService.getSavedActivationCode();
    if (savedActivation) {
      console.log('Using saved activation code:', savedActivation.code);
      setIsActivated(true);
      setActivationCode(savedActivation.code);
      setIsValidating(false);
      return;
    }

    // 2. 从URL获取激活码
    const codeFromURL = ActivationService.getActivationCodeFromURL();
    if (!codeFromURL) {
      setActivationError('请使用有效的激活码访问此页面');
      setIsActivated(false);
      setIsValidating(false);
      return;
    }

    setActivationCode(codeFromURL);

    // 3. 向后端验证激活码
    try {
      const result = await ActivationService.validateActivationCode(codeFromURL);
      
      if (result.isValid && result.expiresAt) {
        // 验证成功，保存到本地存储
        ActivationService.saveActivationCode(codeFromURL, result.expiresAt);
        setIsActivated(true);
        setActivationError(null);
      } else {
        // 验证失败
        setIsActivated(false);
        setActivationError(result.message);
      }
    } catch (error) {
      console.error('Activation validation failed:', error);
      setIsActivated(false);
      setActivationError('激活码验证失败，请稍后重试');
    }

    setIsValidating(false);
  };

  const handleStart = () => {
    setScreen('question');
  };

  const handleAnswer = (score: number) => {
    const newTotalScore = totalScore + score;
    setTotalScore(newTotalScore);

    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const finalResult = calculateAgePreference(newTotalScore);
      setResult(finalResult);
      // 直接显示结果，跳过付费页面
      setScreen('result');
      // setShowPaymentModal(true); // 暂时隐藏付费功能
    }
  };

  const handleSelectPlan = (plan: 'basic' | 'professional' | 'premium') => {
    const prices = {
      basic: '0.1',
      professional: '19.9',
      premium: '199'
    };
    setSelectedPlan({ plan, price: prices[plan] });
    setShowMethodModal(true);
  };

  const handleSelectMethod = (method: 'wechat' | 'alipay') => {
    if (!selectedPlan) return;
    
    // TODO: 在这里接入支付API
    // 根据 method 和 selectedPlan 调用相应的支付接口
    console.log('Payment method:', method);
    console.log('Plan:', selectedPlan.plan);
    console.log('Price:', selectedPlan.price);
    
    // 示例：调用支付接口
    initiatePayment(method, selectedPlan.plan, selectedPlan.price);
  };

  const initiatePayment = async (method: 'wechat' | 'alipay', plan: string, price: string) => {
    // ============================================
    // 在这里配置您的收款账号信息
    // ============================================
    
    const paymentConfig = {
      // 微信支付配置
      wechat: {
        merchantId: 'YOUR_WECHAT_MERCHANT_ID',  // 您的微信商户号
        appId: 'YOUR_WECHAT_APP_ID',            // 您的微信AppID
        apiKey: 'YOUR_WECHAT_API_KEY',          // 您的微信API密钥
      },
      // 支付宝配置
      alipay: {
        appId: 'YOUR_ALIPAY_APP_ID',            // 您的支付宝AppID
        privateKey: 'YOUR_ALIPAY_PRIVATE_KEY',  // 您的支付宝私钥
        publicKey: 'YOUR_ALIPAY_PUBLIC_KEY',    // 支付宝公钥
      }
    };

    // 构建订单信息
    const orderInfo = {
      orderId: `ORDER_${Date.now()}`,
      plan: plan,
      amount: price,
      timestamp: new Date().toISOString(),
      description: `MBTI性格测试 - ${plan}版`
    };

    console.log('Payment Config:', paymentConfig[method]);
    console.log('Order Info:', orderInfo);

    try {
      // TODO: 调用实际的支付API
      // 示例代码（需要根据实际支付SDK调整）:
      /*
      let paymentResult;
      
      if (method === 'wechat') {
        // 微信支付
        paymentResult = await WeChatPay.createOrder({
          merchantId: paymentConfig.wechat.merchantId,
          appId: paymentConfig.wechat.appId,
          orderId: orderInfo.orderId,
          amount: orderInfo.amount,
          description: orderInfo.description,
          notifyUrl: 'https://your-domain.com/api/payment/notify',
          returnUrl: 'https://your-domain.com/payment/success'
        });
        
        // 显示支付二维码或跳转支付页面
        // 等待支付结果回调
        const paymentStatus = await checkPaymentStatus(orderInfo.orderId);
        
        if (paymentStatus === 'success') {
          handlePaymentSuccess();
        } else {
          handlePaymentFailure('支付失败，请重试');
        }
        
      } else {
        // 支付宝支付
        paymentResult = await Alipay.createOrder({
          appId: paymentConfig.alipay.appId,
          orderId: orderInfo.orderId,
          amount: orderInfo.amount,
          subject: orderInfo.description,
          notifyUrl: 'https://your-domain.com/api/payment/notify',
          returnUrl: 'https://your-domain.com/payment/success'
        });
        
        // 跳转到支付页面
        // 等待支付结果回调
        const paymentStatus = await checkPaymentStatus(orderInfo.orderId);
        
        if (paymentStatus === 'success') {
          handlePaymentSuccess();
        } else {
          handlePaymentFailure('支付失败，请重试');
        }
      }
      */

      // ============================================
      // 临时：模拟支付流程（开发测试用）
      // 实际使用时请删除此部分，使用上面的真实支付API
      // ============================================
      const userConfirm = window.confirm(
        `支付方式: ${method === 'wechat' ? '微信支付' : '支付宝'}\n套餐: ${plan}\n金额: ¥${price}\n\n点击"确定"模拟支付成功\n点击"取消"模拟支付失败\n\n请在 src/App.tsx 的 initiatePayment 函数中配置您的收款账号`
      );

      if (userConfirm) {
        // 模拟支付成功
        handlePaymentSuccess();
      } else {
        // 模拟支付失败
        handlePaymentFailure('支付已取消');
      }

    } catch (error) {
      console.error('Payment error:', error);
      handlePaymentFailure('支付过程中出现错误，请重试');
    }
  };

  const handlePaymentSuccess = () => {
    // 支付成功，关闭所有弹窗，跳转到结果页面
    setShowMethodModal(false);
    setShowPaymentModal(false);
    setScreen('result');
  };

  const handlePaymentFailure = (errorMessage: string) => {
    // 支付失败，保持在支付弹窗，显示错误信息
    alert(errorMessage);
    // 不关闭任何弹窗，让用户可以重新尝试
  };

  const handleCloseMethodModal = () => {
    setShowMethodModal(false);
    // 不关闭套餐选择弹窗，让用户可以重新选择
  };

  const calculateAgePreference = (score: number): AgePreferenceResult => {
    // 分数范围：-40 到 +40 (20题 × 每题-2到+2)
    // 转换为 0-100 的分数：0表示极度年下，50表示同龄，100表示极度年上
    const normalizedScore = Math.round(((score + 40) / 80) * 100);
    const finalScore = Math.max(0, Math.min(100, normalizedScore));
    
    let level: AgePreferenceResult['level'];
    let description: string;
    
    if (finalScore <= 20) {
      level = 'extreme_younger';
      description = '你是标准的"年下控"！喜欢充满活力、阳光可爱的小奶狗。你享受在恋爱中占据主导地位，喜欢被崇拜和依赖的感觉。年轻的他们能给你带来青春的活力和无限的新鲜感。';
    } else if (finalScore <= 40) {
      level = 'younger';
      description = '你偏好年龄比你小的对象。你喜欢那种轻松自在、没有压力的相处模式，享受和对方一起成长的过程。你不需要对方太成熟，反而觉得年轻的活力更有吸引力。';
    } else if (finalScore <= 60) {
      level = 'same_age';
      description = '你更倾向于同龄人！你重视平等的关系，希望和对方站在同一视角看世界。你们有相似的经历和话题，能够互相理解，共同成长。这种势均力敌的感觉让你最舒服。';
    } else if (finalScore <= 80) {
      level = 'older';
      description = '你偏好年龄比你大的对象。你欣赏成熟稳重的魅力，希望对方能给你一定的安全感和指导。但你也不希望年龄差距太大，更喜欢那种温柔体贴、懂你但不会管太多的感觉。';
    } else {
      level = 'extreme_older';
      description = '你是"年上控"！你被成熟稳重、有人生阅历的大叔深深吸引。你渴望被照顾、被宠爱的感觉，希望对方能像长辈一样给你安全感和依靠。年龄带来的成熟魅力对你来说是致命的吸引力。';
    }
    
    return { score: finalScore, level, description };
  };

  // Dynamic color themes for each question - Rose and Pink spectrum
  const colorThemes = [
    'linear-gradient(135deg, #FFB6D9 0%, #FF6B9D 50%, #E91E63 100%)', // Light Pink → Pink → Rose
    'linear-gradient(135deg, #FF8BA7 0%, #F06292 50%, #EC407A 100%)', // Pink → Medium Pink → Deep Pink
    'linear-gradient(135deg, #FFE4EC 0%, #FFB6D9 50%, #FF6B9D 100%)', // Pale Pink → Light Pink → Pink
    'linear-gradient(135deg, #F06292 0%, #E91E63 50%, #C2185B 100%)', // Medium Pink → Rose → Deep Rose
    'linear-gradient(135deg, #FFD1DC 0%, #FFB6D9 50%, #FF8BA7 100%)', // Pastel Pink → Light Pink → Pink
    'linear-gradient(135deg, #FF6B9D 0%, #E91E63 50%, #D81B60 100%)', // Pink → Rose → Deep Rose
    'linear-gradient(135deg, #FFC1CC 0%, #FF8BA7 50%, #F06292 100%)', // Light Pink → Pink → Medium Pink
    'linear-gradient(135deg, #E91E63 0%, #C2185B 50%, #AD1457 100%)', // Rose → Deep Rose → Dark Rose
  ];

  const getBackgroundStyle = () => {
    if (screen === 'question') {
      return { background: colorThemes[currentQuestion] };
    }
    return { background: colorThemes[0] };
  };

  // 显示加载状态
  if (isValidating) {
    return (
      <div className="app" style={{ background: colorThemes[0] }}>
        <div className="container" style={{ textAlign: 'center', padding: '100px 40px' }}>
          <div style={{ fontSize: '3em', marginBottom: '20px' }}>⏳</div>
          <h2 style={{ 
            background: 'linear-gradient(135deg, #FF6B9D 0%, #C8A2FF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontSize: '1.5em',
            fontWeight: 'bold'
          }}>
            验证激活码中...
          </h2>
        </div>
      </div>
    );
  }

  // 显示激活错误
  if (!isActivated && activationError) {
    return <ActivationError message={activationError} code={activationCode || undefined} />;
  }

  // 激活成功，显示正常应用
  return (
    <div className="app" style={getBackgroundStyle()}>
      {/* <LanguageSwitcher /> */}
      <div className="container">
        {screen === 'start' && <StartScreen onStart={handleStart} />}
        {screen === 'question' && (
          <QuestionScreen
            currentQuestion={currentQuestion}
            totalQuestions={totalQuestions}
            onAnswer={handleAnswer}
          />
        )}
        {screen === 'result' && result && (
          <ResultScreen result={result} />
        )}
        <div className="card-watermark">@潜学天下</div>
      </div>
      {showPaymentModal && <PaymentModal onSelectPlan={handleSelectPlan} />}
      {showMethodModal && selectedPlan && (
        <PaymentMethodModal
          plan={selectedPlan.plan}
          price={selectedPlan.price}
          onSelectMethod={handleSelectMethod}
          onClose={handleCloseMethodModal}
        />
      )}
    </div>
  );
}

export default App;
