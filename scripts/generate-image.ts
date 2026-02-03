import * as fs from 'fs';
import * as path from 'path';

interface ImageGenerationOptions {
  prompt: string;
  model?: string;
  aspectRatio?: '1:1' | '2:3' | '3:2' | '3:4' | '4:3' | '4:5' | '5:4' | '9:16' | '16:9' | '21:9';
  imageSize?: '1K' | '2K' | '4K';
}

async function generateImage(options: ImageGenerationOptions): Promise<string> {
  const {
    prompt,
    model = 'black-forest-labs/flux.2-pro',
    aspectRatio = '1:1',
    imageSize = '1K'
  } = options;

  const apiKey = process.env.OPENROUTER_API_KEY;
  
  if (!apiKey) {
    throw new Error('OPENROUTER_API_KEY environment variable is required');
  }

  console.log(`Generating image with ${model}...`);
  console.log(`Prompt: ${prompt}`);
  console.log(`Aspect ratio: ${aspectRatio}, Size: ${imageSize}`);

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://bano-wyderka.local',
      'X-Title': 'Bano Wyderka Image Generator'
    },
    body: JSON.stringify({
      model: model,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      modalities: ['image', 'text'],
      image_config: {
        aspect_ratio: aspectRatio,
        image_size: imageSize
      }
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenRouter API error: ${response.status} - ${error}`);
  }

  const result = await response.json();

  if (!result.choices || !result.choices[0]?.message?.images) {
    throw new Error('No images returned in response');
  }

  const images = result.choices[0].message.images;
  
  if (images.length === 0) {
    throw new Error('Empty images array in response');
  }

  return images[0].image_url.url;
}

function saveImage(base64DataUrl: string, filename: string): string {
  const base64Data = base64DataUrl.replace(/^data:image\/\w+;base64,/, '');
  const buffer = Buffer.from(base64Data, 'base64');
  
  const outputPath = path.resolve(filename);
  fs.writeFileSync(outputPath, buffer);
  
  return outputPath;
}

async function main() {
  try {
    const prompt = process.argv[2] || 'A beautiful sunset over mountains with dramatic clouds';
    const outputFile = process.argv[3] || `generated-image-${Date.now()}.png`;

    const imageDataUrl = await generateImage({
      prompt,
      model: 'black-forest-labs/flux.2-pro',
      aspectRatio: '16:9',
      imageSize: '1K'
    });

    const savedPath = saveImage(imageDataUrl, outputFile);
    
    console.log('\n✅ Image generated successfully!');
    console.log(`📁 Saved to: ${savedPath}`);
    console.log(`📊 Size: ${(fs.statSync(savedPath).size / 1024).toFixed(2)} KB`);
    
  } catch (error) {
    console.error('❌ Error:', error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

export { generateImage, saveImage };
